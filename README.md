# Express TypeScript Example
> An example Express application written in TypeScript

## Introduction

This app is an experiment with incorporating TypeScript into traditional Express development.

The benefits of TypeScript go without saying, and the availability of quality type definitions for
Node and Express packages (compared to Flow) make using TypeScript a no-brainer.

## Notes

### Environment Variables

The app uses configuration by environment variables, which are loaded by `dotenv` in development.

In a production scenario, how you load these variables will depend on the platform you are deploying
to. This is why `dotenv` is loaded with the `node --require` flag instead of being hard-coded into
the app.

**`.env`**

```
HOST=0.0.0.0
PORT=3000
TYPEORM_CONNECTION=sqlite
TYPEORM_DATABASE=database/database.db
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
DEBUG=server,server:*
NODE_ENV=development
```

### Testing

I went with Ava over Jest because it includes TypeScript definitions and doesn't require any
additional dependencies to work with TypeScript other than `ts-node` (which I'm already using).

Jest requires `@types/jest` and `ts-jest` to work. It's simple to set up, so it's certainly a viable
alternative.

Since Ava does not include a coverage tool, `nyc` is used (which also works with TypeScript with
minimal configuration).

### Linting

ESLint is used with the `@typescript-eslint` parser and plugin. Being able to use your existing
ESLint configs makes transitioning to TypeScript seamless without sacrificing coding standards.
