import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const router = express.Router();



// get
router.get('/', getAllProducts);

// get
router.get('/:id', getProductById); 

// post
router.post('/', createProduct); 

// put
router.put('/:id', updateProduct); 

// delete
router.delete('/:id', deleteProduct);

export default router;