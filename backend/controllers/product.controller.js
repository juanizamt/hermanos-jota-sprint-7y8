import Product from '../models/product.model.js';

//get
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

//get por id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// post
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); 
    const savedProduct = await newProduct.save(); 
    
    res.status(201).json(savedProduct); 
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// put
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body; 
    
    
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// delete
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
    }
    
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};