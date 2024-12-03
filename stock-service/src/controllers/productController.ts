import { Request, Response } from 'express';
import {
  createProduct,
  createStock,
  decreaseStock,
  getAllProducts,
  getProductsByFilters,
  getStockByFilters,
  increaseStock,
} from '../services';
import { CustomError } from '../types';

export const createProductController = async (req: Request, res: Response) => {
  const { plu, name } = req.body;
  try {
    const product = await createProduct(plu, name);
    res.send(product);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).send({ error: error || 'Something went wrong' });
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  const { page, limit, } = req.query;
  try {
    const productsList = await getAllProducts(Number(page), Number(limit));
    res.send(productsList);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).send({ error: error || 'Something went wrong' });
  }
};

export const getProductsByFiltersController = async (req: Request, res: Response) => {
  const { name, plu } = req.query;

  try {
    const products = await getProductsByFilters(name as string, plu as string);
    res.send(products);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).send({ error: error || 'Something went wrong' });
  }
};

export const createStockController = async (req: Request, res: Response) => {
  const { productId, quantityOnShelf, quantityInOrder, shopId } = req.body;
  try {
    const stock = await createStock(productId, quantityOnShelf, quantityInOrder, shopId);
    res.send(stock);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).send({ error: error || 'Something went wrong' });
  }
};

export const increaseStockController = async (req: Request, res: Response) => {
  const { productId, quantity, shopId } = req.body;
  try {
    const stock = await increaseStock(Number(productId), Number(quantity), Number(shopId));
    res.status(200).json(stock);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).send({ error: error || 'Something went wrong' });
  }
};

export const decreaseStockController = async (req: Request, res: Response) => {
  const { productId, quantity, shopId } = req.body;
  try {
    const stock = await decreaseStock(Number(productId), Number(quantity), Number(shopId));
    res.status(200).json(stock);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).send({ error: error || 'Something went wrong' });
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
    res.send(stocks);
  } catch (error: unknown) {
    const err = error as CustomError;
    res.status(err.statusCode || 500).send({ error: error || 'Something went wrong' });
  }
};
