import { CreateProductDTO } from '../../dtos/createProduct.dto';
import { ProductsRepository } from '../../repository/products.repository';

export class CreateProductService {
    constructor(private productsRepository: ProductsRepository) {}

    async execute(data: CreateProductDTO) {
        try {
            return await this.productsRepository.createProduct(data);
        } catch {
            throw new Error('Erro ao criar produto');
        }
    }
}
