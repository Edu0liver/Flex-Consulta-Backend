import { Router } from 'express';
import { GetProductsController } from '../../modules/products/services/getProducts/getProducts.controller';
import { CreateProductController } from '../../modules/products/services/createProduct/createProduct.controller';
import { UpdateProductController } from 'src/modules/products/services/updateProduct/updateProduct.controller';

export const productsRoutes = Router();

const getProductsController = new GetProductsController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();

productsRoutes.get('/', getProductsController.handle);
productsRoutes.post('/', createProductController.handle);
productsRoutes.put('/:id', updateProductController.handle);
// productsRoutes.delete('/:id', deleteProductController.handle);
