import { Store, Memo } from './types';

export default {
  memos: [
    {
      id: 1,
      content: '첫번째 메모',
      createdAt: 1616654924119,
      updatedAt: 1616654924119
    },
    {
      id: 2,
      content: "두번째 메모",
      createdAt: 1616654926911,
      updatedAt: 1616654926911
    }
  ] as Memo[]
} as Store