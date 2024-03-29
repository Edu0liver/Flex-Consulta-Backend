import { ResponseFormat } from 'src/shared/providers/ResponseFormat';
import { GetProductsDTO, getProductsSchema } from '../../dtos/getProducts.dto';
import { ProductsRepository } from '../../repository/products.repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetProductsService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: ProductsRepository,
    ) {}

    async execute(data: GetProductsDTO) {
        try {
            getProductsSchema.parse(data);
        } catch (error) {
            return new ResponseFormat(400, { message: error });
        }

        try {
            const products = await this.productsRepository.getProducts(data);

            return new ResponseFormat(200, products);
        } catch (error) {
            return new ResponseFormat(500, { message: error.message });
        }
    }
}
