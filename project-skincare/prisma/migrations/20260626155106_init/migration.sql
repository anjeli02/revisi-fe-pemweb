-- CreateTable
CREATE TABLE `Bobot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bobotHarga` DOUBLE NOT NULL,
    `bobotJenisKulit` DOUBLE NOT NULL,
    `bobotMasalahKulit` DOUBLE NOT NULL,
    `bobotKandungan` DOUBLE NOT NULL,
    `bobotBpom` DOUBLE NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
