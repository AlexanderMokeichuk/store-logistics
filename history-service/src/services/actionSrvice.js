const prisma = require('../models/prismaClient');

const logAction = async (productId, shopId, plu, action) => {
  return prisma.productActionHistory.create({
    data: {
      product_id: productId,
      shop_id: shopId,
      plu,
      action,
    },
  });
};

const getActionHistory = async (filters, page = 1, pageSize = 10) => {
  const { shopId, plu, dateFrom, dateTo, action } = filters;

  const where = {};

  if (shopId) where.shop_id = shopId;
  if (plu) where.plu = plu;
  if (dateFrom || dateTo) {
    where.created_at = {};
    if (dateFrom) where.created_at.gte = new Date(dateFrom);
    if (dateTo) where.created_at.lte = new Date(dateTo);
  }
  if (action) where.action = action;

  const skip = (page - 1) * pageSize;

  const actionHistory = await prisma.productActionHistory.findMany({
    where,
    skip,
    take: pageSize,
  });

  const totalCount = await prisma.productActionHistory.count({
    where,
  });

  return {
    actionHistory,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
};

module.exports = { logAction, getActionHistory };