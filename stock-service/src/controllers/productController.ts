import { Request, Response } from 'express';
import { createProduct, createStock, getStockByFilters } from '../services';
import { CustomError } from '../types/error';

export const createProductController = async (req: Request, res: Response) => {
  const { plu, name } = req.body;
  try {
    const product = await createProduct(plu, name);
    res.status(201).json(product);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).json({ error: err.message || 'Something went wrong' });
  }
};

export const createStockController = async (req: Request, res: Response) => {
  const { productId, quantityOnShelf, quantityInOrder, shopId } = req.body;
  try {
    const stock = await createStock(productId, quantityOnShelf, quantityInOrder, shopId);
    res.status(201).json(stock);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).json({ error: err.message || 'Something went wrong' });
  }
};

export const getStockByFiltersController = async (req: Request, res: Response) => {
  const { plu, shopId, minShelfQuantity, maxShelfQuantity, minOrderQuantity, maxOrderQuantity } =
    req.query;
  try {
    const stocks = await getStockByFilters(
      plu as string,
      shopId ? parseInt(shopId as string) : undefined,
      minShelfQuantity ? parseInt(minShelfQuantity as string) : undefined,
      maxShelfQuantity ? parseInt(maxShelfQuantity as string) : undefined,
      minOrderQuantity ? parseInt(minOrderQuantity as string) : undefined,
      maxOrderQuantity ? parseInt(maxOrderQuantity as string) : undefined,
    );
    res.status(200).json(stocks);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).json({ error: err.message || 'Something went wrong' });
  }
};
