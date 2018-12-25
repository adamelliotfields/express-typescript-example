# Express TypeScript Demo
> Experimenting with structuring and configuring an Express application using TypeScript.

## Introduction

This is an exercise in trying to incorporate TypeScript into my daily routine. Specifically, I
wanted to get comfortable with `tsconfig` and see how well it incorporates with the existing
libraries and tools I use.

## Notes

### `.env`

You'll need to create a `.env` file in the project root with the `HOST` and `PORT` variables set. By
convention, this file is never checked into Git and the application itself will fall-back to default
values if not present.

There is a workaround with Docker Compose [here](https://github.com/docker/compose/pull/3955#issuecomment-443264296).

```
HOST=0.0.0.0
PORT=3000
```
