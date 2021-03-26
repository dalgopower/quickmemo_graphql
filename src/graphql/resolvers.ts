import store from '../store';

import { Memo } from '../types';

/*
  데이터베이스의 테이블 또는 컬럼에 추가/삭제/수정이 이루어졌다면
  아래의 2가지 명령을 실행시켜야 한다.

  # 1) 데이터베이스의 스키마를 읽어서 가져와서
  # Prisma 스키마 (schema.prisma 파일) 을 업데이트 시킴
  npx prisma introspect

  # 2) Prisma 스키마를 prisma/schema.prisma에서 읽어서
  # ./node_modules/@prisma/client에다가 Prisma Client를 생성함
  npx prisma generate
*/

const resolvers = {
  Query: {
    ping: () => "pong",
    memos: async (_: any, payload: any, ctx: any) => {
      let memos = [];
      try {
        memos = await ctx.prisma.memo.findMany();
      } catch(err) {
        console.log(err);
      }
      return memos;
    },
  },
  Memo: {
    // GraphQL의 'Int'는 32-bit라서 타임스탬프를 보내려면
    // 문자열로 변환해서 보내야 함.
    createdAt: (parent: any) => String(parent.createdAt),
    updatedAt: (parent: any) => String(parent.updatedAt)
  },
  Mutation: {
    createMemo: async (_: any, args: any, ctx: any) => {
      try {
        const newMemo: Memo = await ctx.prisma.memo.create({
          data: {
            content: args.content,
            createdAt: new Date().valueOf(),
            updatedAt: new Date().valueOf()
          }
        })
        return newMemo;
      } catch(err) {
        console.log(`createMemo resolver`);
        console.log(err);
      }

      return null;
    },
    updateMemo: async (_: any, args: any, ctx: any) => {
      const memoId: number = args.id;
      try {
        const updated = await ctx.prisma.memo.update({
          where: {
            id: memoId
          },
          data: {
            content: args.content,
            updatedAt: new Date().valueOf()
          }
        })
        return { ok: updated ? true : false };
      } catch(err) {
        if (err.code === 'P2025') {
          console.log(`Record #${memoId}: ${err.meta.cause}`);
        } else {
          console.log(`updateMemo resolver`);
          console.log(err);
        }
        return { ok: false };
      }
    },
    deleteMemo: async (_: any, args: any, ctx: any) => {
      const memoId: number = args.id;
      try {
        const updated = await ctx.prisma.memo.delete({
          where: {
            id: memoId
          }
        })
        return { ok: updated ? true : false };
      } catch(err) {
        if (err.code === 'P2025') {
          console.log(`Record #${memoId}: ${err.meta.cause}`);
        } else {
          console.log(`updateMemo resolver`);
          console.log(err);
        }
        return { ok: false };
      }
    }
  }
}

export default resolvers;