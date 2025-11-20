import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true, 
    trim: true      
  },
  descripcion: {
    type: String,
    required: false 
  },
  precio: {
    type: Number,
    required: true, 
    min: 0          
  },
  stock: {
    type: Number,
    required: false, 
    default: 0,      
    min: 0
  },
  imagenUrl: {
    type: String,
    required: false 
  }
}, {
 
  timestamps: true 
});



const Product = mongoose.model('Product', productSchema);

export default Product;