import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Bobot SAW
  await prisma.bobot.create({
    data: {
      bobotHarga: 0.20,
      bobotJenisKulit: 0.25,
      bobotMasalahKulit: 0.25,
      bobotKandungan: 0.20,
      bobotBpom: 0.10,
    },
  });

  // Seed 70 Produk dari Excel
  const products = [
    { kode: "A1",  name: "Somethinc Acne Treatment Gel",        brand: "Somethinc",      nilaiHarga: 4, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A2",  name: "Somethinc Low pH Cleanser",           brand: "Somethinc",      nilaiHarga: 3, nilaiJenisKulit: 5, nilaiMasalahKulit: 4, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A3",  name: "Somethinc Ceramic Skin Saviour",      brand: "Somethinc",      nilaiHarga: 4, nilaiJenisKulit: 4, nilaiMasalahKulit: 3, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A4",  name: "Somethinc Niacinamide Serum",         brand: "Somethinc",      nilaiHarga: 4, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A5",  name: "Somethinc Bakuchiol Serum",           brand: "Somethinc",      nilaiHarga: 4, nilaiJenisKulit: 3, nilaiMasalahKulit: 4, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A6",  name: "Skintific Ceramide Moisture Gel",     brand: "Skintific",      nilaiHarga: 3, nilaiJenisKulit: 5, nilaiMasalahKulit: 4, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A7",  name: "Skintific Acne Serum",                brand: "Skintific",      nilaiHarga: 3, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A8",  name: "Skintific Niacinamide Serum",         brand: "Skintific",      nilaiHarga: 3, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A9",  name: "Skintific Sunscreen SPF50",           brand: "Skintific",      nilaiHarga: 3, nilaiJenisKulit: 4, nilaiMasalahKulit: 3, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A10", name: "Skintific Mugwort Clay Mask",         brand: "Skintific",      nilaiHarga: 3, nilaiJenisKulit: 5, nilaiMasalahKulit: 4, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A11", name: "Azarine Acne Spot Serum",             brand: "Azarine",        nilaiHarga: 4, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A12", name: "Azarine Hydrasoothe Sunscreen",       brand: "Azarine",        nilaiHarga: 4, nilaiJenisKulit: 4, nilaiMasalahKulit: 3, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A13", name: "Azarine Ceraspray Serum",             brand: "Azarine",        nilaiHarga: 4, nilaiJenisKulit: 3, nilaiMasalahKulit: 4, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A14", name: "Azarine Brightening Serum",           brand: "Azarine",        nilaiHarga: 4, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A15", name: "Azarine Low pH Cleanser",             brand: "Azarine",        nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 4, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A16", name: "Wardah Acnederm Serum",               brand: "Wardah",         nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A17", name: "Wardah Acnederm Cleanser",            brand: "Wardah",         nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 4, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A18", name: "Wardah Crystal Secret Serum",         brand: "Wardah",         nilaiHarga: 4, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A19", name: "Wardah Lightening Toner",             brand: "Wardah",         nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 4, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A20", name: "Wardah UV Shield Sunscreen",          brand: "Wardah",         nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 3, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A21", name: "Glad2Glow Centella Serum",            brand: "Glad2Glow",      nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 4, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A22", name: "Glad2Glow Mugwort Toner",             brand: "Glad2Glow",      nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 4, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A23", name: "Glad2Glow Ceramide Moisturizer",      brand: "Glad2Glow",      nilaiHarga: 4, nilaiJenisKulit: 3, nilaiMasalahKulit: 4, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A24", name: "Glad2Glow Brightening Serum",         brand: "Glad2Glow",      nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A25", name: "Glad2Glow Acne Gel",                  brand: "Glad2Glow",      nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A26", name: "The Originote Niacinamide Serum",     brand: "The Originote",  nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A27", name: "The Originote Hyalucera Moisturizer", brand: "The Originote",  nilaiHarga: 5, nilaiJenisKulit: 3, nilaiMasalahKulit: 3, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A28", name: "The Originote Brightening Serum",     brand: "The Originote",  nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A29", name: "The Originote Acne Serum",            brand: "The Originote",  nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A30", name: "Avoskin Miraculous Refining Serum",   brand: "Avoskin",        nilaiHarga: 2, nilaiJenisKulit: 4, nilaiMasalahKulit: 4, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A31", name: "Avoskin Niacinamide Serum",           brand: "Avoskin",        nilaiHarga: 2, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A32", name: "Avoskin Retinol Serum",               brand: "Avoskin",        nilaiHarga: 2, nilaiJenisKulit: 3, nilaiMasalahKulit: 4, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A33", name: "Avoskin Essence Toner",               brand: "Avoskin",        nilaiHarga: 2, nilaiJenisKulit: 3, nilaiMasalahKulit: 3, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A34", name: "Whitelab Acne Serum",                 brand: "Whitelab",       nilaiHarga: 4, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A35", name: "Whitelab Brightening Serum",          brand: "Whitelab",       nilaiHarga: 4, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A36", name: "Whitelab Ceramide Moisturizer",       brand: "Whitelab",       nilaiHarga: 4, nilaiJenisKulit: 3, nilaiMasalahKulit: 4, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A37", name: "Emina Acne Facial Wash",              brand: "Emina",          nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A38", name: "Emina Bright Stuff Serum",            brand: "Emina",          nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A39", name: "Emina Moisturizer",                   brand: "Emina",          nilaiHarga: 5, nilaiJenisKulit: 3, nilaiMasalahKulit: 3, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A40", name: "Hanasui Brightening Serum",           brand: "Hanasui",        nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A41", name: "Hanasui Sunscreen Serum",             brand: "Hanasui",        nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 3, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A42", name: "Erha Acne Cleanser",                  brand: "Erha",           nilaiHarga: 3, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A43", name: "Erha Brightening Serum",              brand: "Erha",           nilaiHarga: 3, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A44", name: "N'Pure Centella Toner",               brand: "N'Pure",         nilaiHarga: 3, nilaiJenisKulit: 4, nilaiMasalahKulit: 4, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A45", name: "N'Pure Centella Serum",               brand: "N'Pure",         nilaiHarga: 3, nilaiJenisKulit: 4, nilaiMasalahKulit: 4, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A46", name: "COSRX Snail Essence",                 brand: "COSRX",          nilaiHarga: 2, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A47", name: "COSRX Low pH Cleanser",               brand: "COSRX",          nilaiHarga: 2, nilaiJenisKulit: 5, nilaiMasalahKulit: 4, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A48", name: "Some By Mi AHA BHA Serum",            brand: "Some By Mi",     nilaiHarga: 2, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A49", name: "Cetaphil Gentle Cleanser",            brand: "Cetaphil",       nilaiHarga: 3, nilaiJenisKulit: 4, nilaiMasalahKulit: 3, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A50", name: "Cetaphil Moisturizing Lotion",        brand: "Cetaphil",       nilaiHarga: 3, nilaiJenisKulit: 3, nilaiMasalahKulit: 3, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A51", name: "Hanasui Acne Series Facial Wash",     brand: "Hanasui",        nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A52", name: "Hanasui Power Bright Serum",          brand: "Hanasui",        nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A53", name: "Hanasui Acne Gel Moisturizer",        brand: "Hanasui",        nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A54", name: "Implora Tea Tree Acne Serum",         brand: "Implora",        nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A55", name: "Implora Luminous Brightening Serum",  brand: "Implora",        nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A56", name: "Viva Acne Care Facial Wash",          brand: "Viva",           nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 4, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A57", name: "Viva Bright Beauty Serum",            brand: "Viva",           nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A58", name: "Viva Aloe Vera Moisturizing Gel",     brand: "Viva",           nilaiHarga: 5, nilaiJenisKulit: 3, nilaiMasalahKulit: 3, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A59", name: "La Tulipe Acne Care Serum",           brand: "La Tulipe",      nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A60", name: "La Tulipe Lightening Serum",          brand: "La Tulipe",      nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A61", name: "Pond's Acne Solution Facial Foam",    brand: "Pond's",         nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A62", name: "Pond's Bright Beauty Serum",          brand: "Pond's",         nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A63", name: "Pond's Hydrating Gel Moisturizer",    brand: "Pond's",         nilaiHarga: 5, nilaiJenisKulit: 3, nilaiMasalahKulit: 3, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A64", name: "Acnes Acne Solution Serum",           brand: "Acnes",          nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A65", name: "Acnes Oil Control Cleanser",          brand: "Acnes",          nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 4, nilaiKandungan: 3, nilaiBpom: 5 },
    { kode: "A66", name: "Nivea Brightening Serum",             brand: "Nivea",          nilaiHarga: 5, nilaiJenisKulit: 4, nilaiMasalahKulit: 5, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A67", name: "Nivea Extra Bright Moisturizer",      brand: "Nivea",          nilaiHarga: 5, nilaiJenisKulit: 3, nilaiMasalahKulit: 4, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A68", name: "Nature Republic Aloe Vera Gel",       brand: "Nature Republic", nilaiHarga: 3, nilaiJenisKulit: 3, nilaiMasalahKulit: 3, nilaiKandungan: 5, nilaiBpom: 5 },
    { kode: "A69", name: "Emina Bright Stuff Moisturizer",      brand: "Emina",          nilaiHarga: 5, nilaiJenisKulit: 3, nilaiMasalahKulit: 3, nilaiKandungan: 4, nilaiBpom: 5 },
    { kode: "A70", name: "Safi Acne Solution Cleanser",         brand: "Safi",           nilaiHarga: 5, nilaiJenisKulit: 5, nilaiMasalahKulit: 5, nilaiKandungan: 3, nilaiBpom: 5 },
  ];

  await prisma.product.createMany({ data: products });

  console.log("✅ Seed berhasil! 70 produk + bobot SAW sudah masuk database.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });