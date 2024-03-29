import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductService } from './createProduct.service';
import { createProductDTOSchema } from '../../dtos/createProduct.dto';

export class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, description, price } = createProductDTOSchema.parse(
            req.body,
        );

        const createProductService = container.resolve(CreateProductService);

        const product = await createProductService.execute({
            name,
            description,
            price,
        });

        return res.status(201).json(product);
    }
}
