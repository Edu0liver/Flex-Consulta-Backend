import { inject, injectable } from 'tsyringe';
import {
    CreateProductDTO,
    createProductSchema,
} from '../../dtos/createProduct.dto';
import { ResponseSender } from 'src/shared/providers/ResponseSender';
import { IProductsRepository } from '../../repository/interface/IProducts.repository';

@injectable()
export class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute(data: CreateProductDTO): Promise<ResponseSender> {
        try {
            createProductSchema.parse(data);
        } catch (error) {
            return new ResponseSender(400, { message: error });
        }

        try {
            const product = await this.productsRepository.createProduct(data);

            return new ResponseSender(201, product);
        } catch (error) {
            return new ResponseSender(500, { message: error.message });
        }
    }
}
