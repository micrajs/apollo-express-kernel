import type { Config as ApolloConfig } from 'apollo-server-core';
import type { ErrorRequestHandler, RequestHandler } from 'express';

export interface ServerConfig {
  errorHandler?: ErrorRequestHandler;
  middlewares: RequestHandler[];
}

export interface GraphQLConfig {
  graphqlPath?: string;
  options: ApolloConfig;
}
