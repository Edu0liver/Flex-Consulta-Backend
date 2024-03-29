import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductService } from './createProduct.service';
import { createProductDTOSchema } from '../../dtos/createProduct.dto';

export class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, description, price } = req.body;

        const createProductService = container.resolve(CreateProductService);

        const { statusCode, data } = await createProductService.execute({
            name,
            description,
            price,
        });

        return res.status(statusCode).json(data);
    }
}
