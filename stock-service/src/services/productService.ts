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

export const getProductsByFilters = async (
  name?: string,
  plu?: string,
  page: number = 1,
  pageSize: number = 10,
) => {
  const filters: any = {};

  if (name) {
    filters.name = {
      contains: name,
      mode: 'insensitive',
    };
  }

  if (plu) {
    filters.plu = plu;
  }

  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    where: filters,
    skip,
    take: pageSize,
  });

  const totalCount = await prisma.product.count({
    where: filters,
  });

  return {
    products,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
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

export const increaseStock = async (productId: number, quantity: number, shopId: number) => {
  const currentStock = await prisma.stock.findUnique({
    where: {
      product_id_shop_id: {
        product_id: productId,
        shop_id: shopId,
      },
    },
  });

  if (!currentStock) {
    throw { status: 404, message: 'Stock not found for the given product and shop.' };
  }

  if (quantity <= 0) {
    throw { status: 400, message: 'The quantity to increase must be greater than 0.' };
  }

  const updatedStock = await prisma.stock.update({
    where: {
      id: currentStock.id,
    },
    data: {
      quantity_on_shelf: {
        increment: quantity,
      },
    },
  });

  return updatedStock;
};

export const decreaseStock = async (productId: number, quantity: number, shopId: number) => {
  const currentStock = await prisma.stock.findUnique({
    where: {
      product_id_shop_id: {
        product_id: productId,
        shop_id: shopId,
      },
    },
  });

  if (!currentStock) {
    throw { status: 404, message: 'Stock not found for the given product and shop.' };
  }

  if (quantity <= 0) {
    throw { status: 400, message: 'The quantity to decrease must be greater than 0.' };
  }

  if (quantity > currentStock.quantity_on_shelf) {
    throw {
      status: 400,
      message: 'Cannot decrease the stock by more than the available quantity on the shelf.',
    };
  }

  const updatedStock = await prisma.stock.update({
    where: {
      id: currentStock.id,
    },
    data: {
      quantity_on_shelf: {
        decrement: quantity,
      },
    },
  });

  return updatedStock;
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
