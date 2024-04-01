import { Router } from 'express';
import multer from 'multer';
import { GetProductsController } from '../../modules/products/services/getProducts/getProducts.controller';
import { CreateProductController } from '../../modules/products/services/createProduct/createProduct.controller';
import { UpdateProductController } from 'src/modules/products/services/updateProduct/updateProduct.controller';
import { DeleteProductController } from 'src/modules/products/services/deleteProduct/deleteProduct.controller';
import { uploadConfig } from 'src/shared/config/uploadFiles';
import { UploadProductImageController } from 'src/modules/products/services/uploadProductImage/uploadProductImage.controller';

export const productsRoutes = Router();

const upload = multer(uploadConfig);

const getProductsController = new GetProductsController();
const createProductController = new CreateProductController();
const uploadProductImageController = new UploadProductImageController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productsRoutes.get('/', getProductsController.handle);

productsRoutes.post('/', createProductController.handle);

productsRoutes.post(
    '/image/:id',
    upload.single('image'),
    uploadProductImageController.handle,
);

productsRoutes.put('/:id', updateProductController.handle);

productsRoutes.delete('/:id', deleteProductController.handle);
