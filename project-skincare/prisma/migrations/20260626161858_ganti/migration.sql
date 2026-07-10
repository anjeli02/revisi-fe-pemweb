/*
  Warnings:

  - You are about to drop the column `inputJeniskulit` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `nilaiJeniskulit` on the `product` table. All the data in the column will be lost.
  - Added the required column `inputJenisKulit` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nilaiJenisKulit` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` DROP COLUMN `inputJeniskulit`,
    ADD COLUMN `inputJenisKulit` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `nilaiJeniskulit`,
    ADD COLUMN `nilaiJenisKulit` INTEGER NOT NULL;
