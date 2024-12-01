import express from 'express';
import {
  createProductController,
  createStockController,
  decreaseStockController,
  getAllProductsController,
  getProductsByFiltersController,
  getStockByFiltersController,
  increaseStockController,
} from '../controllers';

const router = express.Router();

router.post('/products', createProductController);
router.get('/products', getAllProductsController);
router.get('/products/search', getProductsByFiltersController);
router.post('/stocks', createStockController);
router.post('/stocks/increase', increaseStockController);
router.post('/stocks/decrease', decreaseStockController);
router.get('/stocks', getStockByFiltersController);

export default router;
