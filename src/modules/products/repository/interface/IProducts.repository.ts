import { Product } from '@prisma/client';
import { CreateProductDTO } from '../../dtos/createProduct.dto';
import { GetProductsDTO } from '../../dtos/getProducts.dto';

export interface IProductsRepository {
    getProducts(data: GetProductsDTO): Promise<Product[]>;
    createProduct(data: CreateProductDTO): Promise<Product>;
}
