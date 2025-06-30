/*
  Warnings:

  - You are about to drop the column `category` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Skill` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,categoryId]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Skill_name_category_key";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "category",
DROP COLUMN "slug",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_categoryId_key" ON "Skill"("name", "categoryId");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
