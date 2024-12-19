/*
  Warnings:

  - Added the required column `review` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "review" VARCHAR(1000) NOT NULL;
