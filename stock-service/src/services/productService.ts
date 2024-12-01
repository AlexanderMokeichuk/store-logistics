import prisma from '../models/prismaClient';

export const createProduct = async (plu: string, name: string) => {
  return await prisma.product.create({
    data: {
      plu,
      name,
    },
  });
};

export const createStock = async (
  productId: number,
  quantityOnShelf: number,
  quantityInOrder: number,
  shopId: number,
) => {
  return await prisma.stock.create({
    data: {
      productId,
      quantityOnShelf,
      quantityInOrder,
      shopId,
    },
  });
};

export const getStockByFilters = async (
  plu?: string,
  shopId?: number,
  minShelfQuantity?: number,
  maxShelfQuantity?: number,
  minOrderQuantity?: number,
  maxOrderQuantity?: number,
) => {
  const filters: any = {};

  if (plu) filters.product = { plu };
  if (shopId) filters.shop_id = shopId;
  if (minShelfQuantity !== undefined) filters.quantity_on_shelf = { gte: minShelfQuantity };
  if (maxShelfQuantity !== undefined) filters.quantity_on_shelf = { lte: maxShelfQuantity };
  if (minOrderQuantity !== undefined) filters.quantity_in_order = { gte: minOrderQuantity };
  if (maxOrderQuantity !== undefined) filters.quantity_in_order = { lte: maxOrderQuantity };

  return await prisma.stock.findMany({
    where: filters,
    include: {
      product: true,
    },
  });
};
