import { GetProductsDTO } from '../../dtos/getProducts.dto';
import { ProductsRepository } from '../../repository/products.repository';

export class GetProductsService {
    constructor(private productsRepository: ProductsRepository) {}

    async execute(data: GetProductsDTO) {
        try {
            return await this.productsRepository.getProducts(data);
        } catch {
            throw new Error('Erro ao buscar produtos');
        }
    }
}
