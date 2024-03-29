import { Router } from 'express';
import { GetProductsController } from '../../modules/products/services/getProducts/getProducts.controller';
import { CreateProductController } from '../../modules/products/services/createProduct/createProduct.controller';

export const productsRoutes = Router();

const getProductsController = new GetProductsController();
const createProductController = new CreateProductController();

productsRoutes.get('/', getProductsController.handle);
productsRoutes.post('/', createProductController.handle);
// productsRoutes.put('/:id', updateProductController.handle);
// productsRoutes.delete('/:id', deleteProductController.handle);
