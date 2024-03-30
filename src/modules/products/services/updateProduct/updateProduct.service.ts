import { inject, injectable } from 'tsyringe';
import { ResponseFormat } from 'src/shared/providers/ResponseFormat';
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

    async execute({ id, ...data }: IRequest): Promise<ResponseFormat> {
        try {
            updateProductSchema.parse(data);
        } catch (error) {
            return new ResponseFormat(400, { message: error });
        }

        try {
            const product = await this.productsRepository.updateProduct(
                id,
                data,
            );

            return new ResponseFormat(204, product);
        } catch (error) {
            return new ResponseFormat(500, { message: error.message });
        }
    }
}
