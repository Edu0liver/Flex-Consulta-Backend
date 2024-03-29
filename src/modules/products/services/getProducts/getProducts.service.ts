import { HttpException } from 'src/shared/error/HttpException';
import { GetProductsDTO } from '../../dtos/getProducts.dto';
import { ProductsRepository } from '../../repository/products.repository';

export class GetProductsService {
    constructor(private productsRepository: ProductsRepository) {}

    async execute(data: GetProductsDTO) {
        try {
            return await this.productsRepository.getProducts(data);
        } catch {
            throw new HttpException('Erro ao buscar produtos', 500);
        }
    }
}

