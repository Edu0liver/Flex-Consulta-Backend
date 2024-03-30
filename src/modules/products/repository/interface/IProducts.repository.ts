import { Product } from '@prisma/client';
import { CreateProductDTO } from '../../dtos/createProduct.dto';
import { GetProductsDTO } from '../../dtos/getProducts.dto';
import { UpdateProductDTO } from '../../dtos/updateProduct.dto';

export interface IProductsRepository {
    getProducts(data: GetProductsDTO): Promise<Product[]>;
    createProduct(data: CreateProductDTO): Promise<Product>;
    updateProduct(id: string, data: UpdateProductDTO): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
}
