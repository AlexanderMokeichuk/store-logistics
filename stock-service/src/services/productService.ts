import prisma from '../models/prismaClient';

export const createProduct = async (plu: string, name: string) => {
  return prisma.product.create({
    data: {
      plu,
      name,
    },
  });
};

export const getAllProducts = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return prisma.product.findMany({
    skip,
    take: limit,
  });
};

export const createStock = async (
  product_id: number,
  quantityOnShelf: number,
  quantityInOrder: number,
  shopId: number,
) => {
  return prisma.stock.create({
    data: {
      product_id,
      quantity_on_shelf: quantityOnShelf,
      quantity_in_order: quantityInOrder,
      shop_id: shopId,
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

  return prisma.stock.findMany({
    where: filters,
    include: {
      product: true,
    },
  });
};
