import { ResponseSender } from 'src/shared/providers/ResponseSender';
import { GetProductsDTO, getProductsSchema } from '../../dtos/getProducts.dto';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../../repository/interface/IProducts.repository';
import { redisClient } from 'src/shared/config/redis.config';

@injectable()
export class GetProductsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute(data: GetProductsDTO): Promise<ResponseSender> {
        try {
            getProductsSchema.parse(data);
        } catch (error) {
            return new ResponseSender(400, { message: error });
        }

        if (
            data.order_by &&
            data.order_by !== 'name' &&
            data.order_by !== 'description'
        ) {
            return new ResponseSender(400, { message: 'Invalid order_by' });
        }

        if (data.order && data.order !== 'asc' && data.order !== 'desc') {
            return new ResponseSender(400, { message: 'Invalid order' });
        }

        try {
            const cacheProducts = await redisClient.get(
                `products:page=${data.page}`,
            );

            if (cacheProducts) {
                return new ResponseSender(200, JSON.parse(cacheProducts));
            }

            const products = await this.productsRepository.getProducts(data);

            await redisClient.set(
                `products:page=${data.page}`,
                JSON.stringify(products),
                'EX',
                60,
            );

            return new ResponseSender(200, products);
        } catch (error) {
            return new ResponseSender(500, { message: error.message });
        }
    }
}
