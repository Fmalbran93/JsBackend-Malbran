class ProductManager {
    constructor() {
      this.products = new Map();
      this.nextId = 1;
    }
  
    addProduct(product) {
      const { title, description, price, thumbnail, code, stock } = product;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error('Todos los campos del producto son obligatorios.');
        return;
      }
  
      if (this.products.has(code)) {
        console.error('Ya existe un producto con el mismo código.');
        return;
      }
  
      product.id = this.nextId++;
      this.products.set(code, product);
      console.log('Producto agregado correctamente:', product);
    }
  
    getProducts() {
      return Array.from(this.products.values());
    }
  
    getProductById(id) {
      for (const product of this.products.values()) {
        if (product.id === id) {
          return product;
        }
      }
      console.error('Producto no encontrado.');
    }
  }
  
  // Crea una instancia de ProductManager
  const manager = new ProductManager();
  
  // Agrega productos
  manager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del Producto 1',
    price: 10.99,
    thumbnail: 'ruta/imagen1.jpg',
    code: 'P1',
    stock: 50
  });
  
  manager.addProduct({
    title: 'Producto 2',
    description: 'Descripción del Producto 2',
    price: 19.99,
    thumbnail: 'ruta/imagen2.jpg',
    code: 'P2',
    stock: 20
  });
  
 // Repito el "Code" para mostrar el error
  manager.addProduct({
    title: 'Producto 3',
    description: 'Descripción del Producto 3',
    price: 29.99,
    thumbnail: 'ruta/imagen2.jpg',
    code: 'P2',
    stock: 20
  });

  //Producto agregado sin descripcion para arrojar mensaje de campos obligatorios!
  manager.addProduct({
    title: 'Producto 4',
    description:"",
    price: 29.99,
    thumbnail: 'ruta/imagen4.jpg',
    code: 'P4',
    stock: 20
  });
  
  // Obtener todos los productos
  const allProducts = manager.getProducts();
  console.log('Todos los productos:', allProducts);
  
  // Obtener un producto por ID
  const productById = manager.getProductById(2); // ID válido
  console.log('Producto encontrado por ID:', productById);
  
  const nonExistingProduct = manager.getProductById(1234); // ID inválido
  // Mostrará en la consola: "Producto no encontrado."