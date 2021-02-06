declare namespace Application {
  interface Services {
    server: import('express').Express;
    graphql: import('@micra/micra-graphql-container').GraphQLContainer;
  }

  interface Config {
    server: import('./src/types').ServerConfig;
    graphql: import('./src/types').GraphQLConfig;
  }

  interface EnvironmentVariables {
    PORT: string;
    AWS_LOAD_BALANCER_IDLE_TIMEOUT: string;
    KEEP_ALIVE_TIMEOUT: string;
    HEADERS_TIMEOUT: string;
    PATH_TO_SCHEMA: string;
  }
}
