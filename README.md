# graphql-prisma
 
mkdir graphql-prisma
cd graphql-prisma


npm init -y

npm install @prisma/cli typescript ts-node @types/node --save-dev

You can now invoke the Prisma CLI by prefixing it with npx:



npx prisma

npx prisma init


Connect your database

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

Create database tables with Prisma Migrate

prisma/schema.prisma

model Post {
  id        Int      @default(autoincrement()) @id
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @default(autoincrement()) @id
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @default(autoincrement()) @id
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}

npx prisma migrate dev --name init --preview-feature



npm install @prisma/client
