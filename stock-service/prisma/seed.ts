import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.createMany({
    data: Array.from({ length: 10 }).map((_, index) => ({
      plu: `PLU-${index + 1}`,
      name: `Product ${index + 1}`,
    })),
  });

  console.log('Created products:', products);

  const stocks = await prisma.stock.createMany({
    data: Array.from({ length: 10 }).map((_, index) => ({
      product_id: index + 1,
      shop_id: index + 1,
      quantity_on_shelf: Math.floor(Math.random() * 100),
      quantity_in_order: Math.floor(Math.random() * 50),
    })),
  });

  console.log('Created stock:', stocks);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
