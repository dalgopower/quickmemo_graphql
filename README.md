# Quick memo web application

## Purpose
The purpose of this application is to practice GraphQL and Prisma.

It is a very simple memo web application. One can write a memo instantly without a title.

## Used
Express / Apollo Server / GraphQL / SQLite3 / Prisma

## Setup

1) Clone

`git clone https://github.com/dalgopower/quickmemo_graphql`

2) Install Node.js dependencies

`npm install`

3) Create a SQLite database file in './prisma'
and .sql file containing SQL statements for migrations.

`npx prisma migrate dev --name init`
> This will create './prisma/migration/{YYYYMMDDHHmmss}_init' directory and 'migration.sql' file within the directory.

> **prisma generate** is called under the hood by default, after running **prisma migrate dev**.

4) Run

`npm run dev`

## Task List

**Major**

- [x] Create initiali version
- [ ] Create sub React.js project for client view
- [ ] Login feature
- [ ] Memo group
- [ ] Select multple memos
- [ ] Toss/Copy memo(s) to other user(s)
- [ ] Delete multiple memo(s)
- [ ] Notification of memo toss/copy
- [ ] Image upload