import express from 'express';
import { ProductManager } from './controllers/productManager.js';

const app = express();
const PORT = 4000;

const filePath = './src/models/productos.txt'; // Ruta del archivo de productos
const manager = new ProductManager(filePath);

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para manejar el formato JSON en las solicitudes

app.get('/', (req, res) => {
  res.send('Hola');
});

app.get('/productos/:id', async (req, res) => {
  const id = req.params.id;
  const product = await manager.getProductById(id);
  if (product) {
    res.send(`Producto encontrado: ${JSON.stringify(product)}`);
  } else {
    res.send('Producto no encontrado');
  }
});

app.post('/productos', async (req, res) => {
  const newProduct = req.body;
  await manager.addProduct(newProduct);
  res.json({ message: 'Producto agregado correctamente' });
});

app.put('/productos/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  
  await manager.updateProduct(id, updatedProduct);
  res.json({ message: 'Producto actualizado correctamente' });
});

app.delete('/productos/:id', async (req, res) => {
  const id = req.params.id;
  
  await manager.deleteProduct(id);
  res.json({ message: 'Producto eliminado correctamente' });
});

app.get('/productos', async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

app.get('*', (req, res) => {
  res.send('Error 404');
});

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}\nhttp://localhost:${PORT}`);
});