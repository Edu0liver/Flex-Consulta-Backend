import { ResponseFormat } from 'src/shared/providers/ResponseFormat';
import { GetProductsDTO } from '../../dtos/getProducts.dto';
import { ProductsRepository } from '../../repository/products.repository';

export class GetProductsService {
    constructor(private productsRepository: ProductsRepository) {}

    async execute(data: GetProductsDTO) {
        try {
            const products = await this.productsRepository.getProducts(data);

            return new ResponseFormat(200, products);
        } catch (error) {
            return new ResponseFormat(500, { message: error.message });
        }
    }
}
