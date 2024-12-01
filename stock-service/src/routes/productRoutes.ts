import express from 'express';
import {
  createProductController,
  createStockController,
  getStockByFiltersController,
} from '../controllers';

const router = express.Router();

router.post('/products', createProductController);
router.post('/stocks', createStockController);
router.get('/stocks', getStockByFiltersController);

export default router;
