import express from 'express';
import {
  createProductController,
  createStockController,
  decreaseStockController,
  getAllProductsController,
  getStockByFiltersController,
  increaseStockController,
} from '../controllers';

const router = express.Router();

router.post('/products', createProductController);
router.get('/products', getAllProductsController);
router.post('/stocks', createStockController);
router.post('/stocks/increase', increaseStockController);
router.post('/stocks/decrease', decreaseStockController);
router.get('/stocks', getStockByFiltersController);

export default router;
