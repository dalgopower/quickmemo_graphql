export interface Store {
  memos: Memo[]
}

export interface Memo {
  id: number        // unique
  content: string
  createdAt: number // timestamp
  updatedAt: number // timestamp
}