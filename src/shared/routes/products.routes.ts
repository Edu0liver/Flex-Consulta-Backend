import { Router } from 'express';
import { GetProductsService } from '../../modules/products/services/getProducts/getProducts.service';
import { ProductsRepository } from '../../modules/products/repository/products.repository';
import { GetProductsController } from '../../modules/products/services/getProducts/getProducts.controller';

export const productsRoutes = Router();

const productsRepository = new ProductsRepository();

const getProductsService = new GetProductsService(productsRepository);
const getProductsController = new GetProductsController(getProductsService);

productsRoutes.get('/', getProductsController.handle);
// productsRoutes.post('/', createProductController.handle);
// productsRoutes.put('/:id', updateProductController.handle);
// productsRoutes.delete('/:id', deleteProductController.handle);
