import { prismaClient } from '../../../shared/database/prisma.service';
import { CreateProductDTO } from '../dtos/createProduct.dto';
import { GetProductsDTO } from '../dtos/getProducts.dto';
import { UpdateProductDTO } from '../dtos/updateProduct.dto';
import { IProductsRepository } from './interface/IProducts.repository';

export class ProductsRepository implements IProductsRepository {
    async getProducts({
        name,
        description,
        order_by,
        order,
        page,
        size,
    }: GetProductsDTO) {
        const take = Number(size);
        const skip = Number(page) * take - take;

        const queryOptions = {
            skip,
            take,
            where: {
                name,
                description,
                deleted_at: null,
            },
            orderBy: {
                [order_by ?? 'created_at']: order ?? 'asc',
            },
        };

        return await prismaClient.product.findMany(queryOptions);
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

    async updateProduct(
        id: string,
        { name, description, price, imageName }: UpdateProductDTO,
    ) {
        return await prismaClient.product.update({
            where: {
                id,
                deleted_at: null,
            },
            data: {
                name,
                description,
                price,
                imageName,
            },
        });
    }

    async deleteProduct(id: string) {
        return await prismaClient.product.update({
            where: {
                id,
            },
            data: {
                deleted_at: new Date(),
            },
        });
    }
}
