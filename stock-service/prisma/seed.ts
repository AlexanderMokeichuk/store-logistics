import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});

  const products = await prisma.product.createMany({
    data: Array.from({ length: 10 }).map((_, index) => ({
      plu: `PLU-${index + 1}`,
      name: `Product ${index + 1}`,
    })),
  });

  console.log('Created products:', products);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
