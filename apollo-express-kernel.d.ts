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

/**
 * Use:
 * This is the global helper that gives access to
 * the service container. It's an easy way to
 * resolve registered services.
 */
declare const use: Use;
type Use = <K extends keyof Application.Services>(
  namespace: K,
) => Application.Services[K];

/**
 * Config:
 * This is the global helper that gives access to the app's
 * configurations. It's an easy way to resolve the
 * registered config for the services.
 */
declare const config: Config;
type Config = <
  K extends keyof Application.Config,
  R extends Application.Config[K]
>(
  namespace: K,
  fallback?: R,
) => R;

/**
 * Env:
 * This is the global helper that gives access to the app's
 * environmental variables. It's an easy way to resolve
 * the registered variables.
 */
declare const env: Env;
type Env = {
  <K extends keyof Application.EnvironmentVariables>(variable: K):
    | Application.EnvironmentVariables[K]
    | undefined;
  <K extends keyof Application.EnvironmentVariables>(
    variable: K,
    fallback: Application.EnvironmentVariables[K],
  ): Application.EnvironmentVariables[K];
};

/**
 * Global:
 * Extension of the global Global object.
 * This will be available in the
 * server.
 */
declare namespace NodeJS {
  interface ProcessEnv extends Application.EnvironmentVariables {}

  interface Global {
    config: Config;
    use: Use;
    env: Env;
  }
}
