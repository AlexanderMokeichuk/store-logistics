import express from 'express';
import {
  createProductController,
  createStockController,
  getAllProductsController,
  getStockByFiltersController,
} from '../controllers';

const router = express.Router();

router.post('/products', createProductController);
router.get('/products', getAllProductsController);
router.post('/stocks', createStockController);
router.get('/stocks', getStockByFiltersController);

export default router;
