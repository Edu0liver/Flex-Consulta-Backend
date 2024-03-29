import { prismaClient } from '../../../shared/database/prisma.service';
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { GetProductsDTO } from '../dtos/getProducts.dto';
import { IProductsRepository } from './interface/IProducts.repository';

export class ProductsRepository implements IProductsRepository {
    async getProducts({ name, description, order_by, order }: GetProductsDTO) {
        return await prismaClient.product.findMany({
            where: {
                name,
                description,
                deleted_at: null,
            },
            orderBy: {
                [order_by]: {
                    _count: order,
                },
            },
        });
    }

    async createProduct({ name, description, price }: CreateProductDTO) {
        return await prismaClient.product.create({
            data: {
                name,
                description,
                price,
            },
        });
    }
}
