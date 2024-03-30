import { inject, injectable } from 'tsyringe';
import { ResponseSender } from 'src/shared/providers/ResponseSender';
import { updateProductSchema } from '../../dtos/updateProduct.dto';
import { IProductsRepository } from '../../repository/interface/IProducts.repository';

interface IRequest {
    id: string;
    name: string;
    description: string;
    price: number;
}

@injectable()
export class UpdateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    async execute({ id, ...data }: IRequest): Promise<ResponseSender> {
        try {
            updateProductSchema.parse(data);
        } catch (error) {
            return new ResponseSender(400, { message: error });
        }

        try {
            const product = await this.productsRepository.updateProduct(
                id,
                data,
            );

            return new ResponseSender(204, product);
        } catch (error) {
            return new ResponseSender(500, { message: error.message });
        }
    }
}
