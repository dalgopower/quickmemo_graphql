import * as fs from 'fs';
import * as path from 'path';

import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { PrismaClient } from '@prisma/client'

import resolvers from './graphql/resolvers';

import { router as indexRouter } from './routes/index';

const port = 9000;

const app = express();
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(indexRouter);

const curDir = __dirname + '/graphql/schema.graphql';
const typeDefs = fs.readFileSync(curDir, { encoding: 'utf-8' });

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
  // introspection: true,
  // playground: true
})

server.applyMiddleware({
  app,
  path: '/graphql' // REST API url
})

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const err: Error = new Error('Page Not Found');
  (err as any).status = 404;
  next(err);
});

// 정보) http://localhost:9000/graphql 으로 playground 접근 가능
app.listen(port, () => {
  console.log(`Listening on ${port}`);
})