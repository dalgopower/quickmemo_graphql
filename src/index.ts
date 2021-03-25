import * as fs from 'fs';

import { ApolloServer, gql } from "apollo-server";
import resolvers from './graphql/resolvers';

const curDir = __dirname + '/graphql/schema.graphql';
const typeDefs = fs.readFileSync(curDir, { encoding: 'utf-8' });

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// 정보) http://localhost:4000 으로 playground 접근 가능
server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`)
})