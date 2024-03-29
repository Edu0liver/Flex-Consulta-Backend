import { prismaClient } from '../../../shared/database/prisma.service';
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { GetProductsDTO } from '../dtos/getProducts.dto';

export class ProductsRepository {
    async getProducts({ nome, descricao, order_by, order }: GetProductsDTO) {
        return await prismaClient.product.findMany({
            where: {
                nome,
                descricao,
            },
            orderBy: {
                [order_by]: {
                    _count: order,
                },
            },
        });
    }

    async createProduct({ nome, descricao, price }: CreateProductDTO) {
        return await prismaClient.product.create({
            data: {
                nome,
                descricao,
                price,
            },
        });
    }
}
