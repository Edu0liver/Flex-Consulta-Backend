import { inject, injectable } from 'tsyringe';
import { ResponseSender } from 'src/shared/providers/ResponseSender';
import {
    DeleteProductSchema,
    deleteProductSchema,
} from '../../dtos/deleteProduct.dto';
import { IProductsRepository } from '../../repository/interface/IProducts.repository';

@injectable()
export class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute({ id }: DeleteProductSchema): Promise<ResponseSender> {
        try {
            deleteProductSchema.parse({ id });
        } catch (error) {
            return new ResponseSender(400, { message: error });
        }

        try {
            const product = await this.productsRepository.deleteProduct(id);

            return new ResponseSender(204, product);
        } catch (error) {
            return new ResponseSender(500, { message: error.message });
        }
    }
}
