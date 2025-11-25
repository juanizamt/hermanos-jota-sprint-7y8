import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock
} from '../controllers/product.controller.js';

import authMiddleware from '../middleware/authMiddleware.js'; 
import adminGuard from '../middleware/adminGuard.js';

const router = express.Router();

router.patch('/update-stock', authMiddleware, updateStock);

// get
router.get('/', getAllProducts);

// get
router.get('/:id', getProductById); 

// post
router.post('/', authMiddleware, adminGuard, createProduct); 

// put
router.put('/:id', authMiddleware, adminGuard, updateProduct); 

// delete
router.delete('/:id', authMiddleware, adminGuard, deleteProduct);

export default router;