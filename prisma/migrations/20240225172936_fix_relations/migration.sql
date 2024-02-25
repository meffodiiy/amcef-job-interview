/*
  Warnings:

  - You are about to drop the column `authorId` on the `todo_lists` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "todo_lists" DROP CONSTRAINT "todo_lists_authorId_fkey";

-- AlterTable
ALTER TABLE "todo_lists" DROP COLUMN "authorId";

-- CreateTable
CREATE TABLE "todo_lists_on_users" (
    "userId" INTEGER NOT NULL,
    "todoListsId" INTEGER NOT NULL,

    CONSTRAINT "todo_lists_on_users_pkey" PRIMARY KEY ("userId","todoListsId")
);

-- AddForeignKey
ALTER TABLE "todo_lists_on_users" ADD CONSTRAINT "todo_lists_on_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo_lists_on_users" ADD CONSTRAINT "todo_lists_on_users_todoListsId_fkey" FOREIGN KEY ("todoListsId") REFERENCES "todo_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
