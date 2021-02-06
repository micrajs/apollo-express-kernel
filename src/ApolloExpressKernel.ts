import '../global.d';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import { Kernel } from '@micra/kernel';
import gql from 'graphql-tag';
import type { Express } from 'express';

export class ApolloKernel extends Kernel {
  protected server!: Express;

  boot() {
    this.server = use('server');
    const graphql = use('graphql');
    const graphqlConfig = config('graphql');
    const options = { ...graphqlConfig.options };
    const serverConfig = config('server');

    serverConfig.middlewares.forEach((middleware) => {
      this.server.use(middleware);
    });

    if (this.container.has('cache')) {
      options.cache = this.container.use<any>('cache');
    }

    if (this.container.has('graphql/context')) {
      options.cache = this.container.use<any>('graphql/context');
    }

    const apolloServer = new ApolloServer({
      ...options,
      schema: buildFederatedSchema([
        {
          typeDefs: gql(graphql.getSchema().join('\n')),
          resolvers: graphql.getResolvers(),
        },
      ]),
    });

    apolloServer.applyMiddleware({
      app: this.server,
      path: graphqlConfig.graphqlPath ?? '/graphql',
    });

    if (serverConfig.errorHandler) {
      this.server.use(serverConfig.errorHandler);
    }
  }

  run() {
    const port = process.env.PORT ?? 4000;
    const app = this.server.listen(port, () => {
      console.log('Running server in:', `http://localhost:${port}`);
    });

    app.keepAliveTimeout =
      Number(process.env.PORT) +
      Number(process.env.KEEP_ALIVE_TIMEOUT);
    app.headersTimeout =
      Number(process.env.PORT) +
      Number(process.env.HEADERS_TIMEOUT);
  }
}
