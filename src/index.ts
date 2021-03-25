import { ApolloServer, gql } from "apollo-server";

interface Memo {
  id: number        // unique
  content: string
  createdAt: number // timestamp
  updatedAt: number // timestamp
}

interface Store {
  memos: Memo[]
}

const store: Store = {
  memos: []
};

const resolvers = {
  Query: {
    ping: () => "pong",
    memos: async (_: any, payload: any, ctx: any) => {
      return store.memos;
    },
  },
  Memo: {
    // GraphQL의 'Int'는 32-bit라서 문자열로 변환해서 보내야 함.
    createdAt: (parent: any) => String(parent.createdAt),
    updatedAt: (parent: any) => String(parent.updatedAt)
  },
  Mutation: {
    createMemo: async (_: any, args: any, ctx: any) => {
      const newMemo: Memo = {
        id: store.memos.length + 1,
        content: args.content,
        createdAt: new Date().valueOf(),
        updatedAt: new Date().valueOf()
      }

      store.memos.push(newMemo);

      return { ok: true };
    },
    updateMemo: async (_: any, args: any, ctx: any) => {
      const memoId: number = args.id;
      // TODO: binary search로 바꾸기
      const target = store.memos.find((memo) => memo.id === memoId);
      if (target) {
        target.content = args.content;
        return { ok: true };
      } else {
        return { ok: false };
      }
    }
  }
}

const typeDefs = gql`
  type Query {
    memos: [Memo]
    ping: String
  }

  type Mutation {
    createMemo(content: String!): CallResult
    updateMemo(id: Int!, content: String!): CallResult
  }

  type Memo {
    id: Int!
    content: String!
    createdAt: String
    updatedAt: String
  }

  type CallResult {
    ok: Boolean!
    err: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// 정보) http://localhost:4000 으로 playground 접근 가능
server.listen().then(({ url }) => {
  console.log(`Listening at ${url}`)
})