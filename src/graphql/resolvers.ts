import store from '../store';

import { Memo } from '../types';

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

export default resolvers;