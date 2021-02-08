<p align="center">
  <img src="https://raw.githubusercontent.com/micrajs/micrajs/live/.assets/logo.png" width="25%">
</p>

<h1 align="center">@micra/apollo-express-kernel</h1>

<p align="center">
  <img alt="version" src="https://img.shields.io/npm/v/@micra/apollo-express-kernel.svg">
  <img alt="issues" src="https://img.shields.io/github/issues/micrajs/library-template.svg">
  <img alt="prs" src="https://img.shields.io/github/issues-pr/micrajs/library-template.svg">
</p>

<hr />

## About

Micra Kernel to run an Express-based Apollo GraphQL server.

## Installation

```sh
yarn add @micra/apollo-express-kernel
```

## Usage

### Config file

In your `app` config:

```typescript
import app from '@micra/application';
import { ApolloExpressKernel } '@micra/apollo-express-kernel';
import type { AppConfig } from '@micra/application';

app.config.set<AppConfig>('app', {
  kernel: ApolloExpressKernel,
  // ...rest
});
```

## Requirements

### Services

```typescript
interface Services {
  server: import('express').Express;
  graphql: import('@micra/micra-graphql-container').GraphQLContainer;
}
```

### Configurations

```typescript
interface Config {
  server: {
    errorHandler?: import('express').ErrorRequestHandler;
    middlewares: import('express').RequestHandler[];
  };

  graphql: {
    graphqlPath?: string;
    options: import('apollo-server-express').Config;
  };
}
```

### Environment variables

```typescript
interface EnvironmentVariables {
  PORT?: string;
  PATH_TO_SCHEMA?: string;
  AWS_LOAD_BALANCER_IDLE_TIMEOUT: string;
  KEEP_ALIVE_TIMEOUT: string;
  HEADERS_TIMEOUT: string;
}
```

## Author

- [Olavo Amorim Santos](https://github.com/olavoasantos)
