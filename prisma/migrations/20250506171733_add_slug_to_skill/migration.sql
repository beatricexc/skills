/*
  Warnings:

  - Added the required column `slug` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "slug" TEXT NOT NULL;
