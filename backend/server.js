import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import productRoutes from './routes/productRoutes.js';


dotenv.config();


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado exitosamente.'))
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); 
  });


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send('API de Mueblería Jota funcionando.');
});


app.use('/api/productos', productRoutes);



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});