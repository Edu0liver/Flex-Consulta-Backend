import { Router } from 'express';
import { GetProductsService } from '../../modules/products/services/getProducts/getProducts.service';
import { ProductsRepository } from '../../modules/products/repository/products.repository';
import { GetProductsController } from '../../modules/products/services/getProducts/getProducts.controller';
import { CreateProductController } from '../../modules/products/services/createProduct/createProduct.controller';
import { CreateProductService } from '../../modules/products/services/createProduct/createProduct.service';

export const productsRoutes = Router();

const productsRepository = new ProductsRepository();

const getProductsService = new GetProductsService(productsRepository);
const getProductsController = new GetProductsController(getProductsService);

const createProductService = new CreateProductService(productsRepository);
const createProductController = new CreateProductController(
    createProductService,
);

productsRoutes.get('/', getProductsController.handle);
productsRoutes.post('/', createProductController.handle);
// productsRoutes.put('/:id', updateProductController.handle);
// productsRoutes.delete('/:id', deleteProductController.handle);
