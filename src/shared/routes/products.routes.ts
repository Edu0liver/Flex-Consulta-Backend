import { Router } from 'express';
import { GetProductsController } from '../../modules/products/services/getProducts/getProducts.controller';
import { CreateProductController } from '../../modules/products/services/createProduct/createProduct.controller';
import { UpdateProductController } from 'src/modules/products/services/updateProduct/updateProduct.controller';
import { DeleteProductController } from 'src/modules/products/services/deleteProduct/deleteProduct.controller';
import { ensuredAuthenticated } from '../middleware/ensureAutheticated.middleware';

export const productsRoutes = Router();

const getProductsController = new GetProductsController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productsRoutes.get('/', ensuredAuthenticated, getProductsController.handle);

productsRoutes.post('/', ensuredAuthenticated, createProductController.handle);

productsRoutes.put(
    '/:id',
    ensuredAuthenticated,
    updateProductController.handle,
);

productsRoutes.delete(
    '/:id',
    ensuredAuthenticated,
    deleteProductController.handle,
);
