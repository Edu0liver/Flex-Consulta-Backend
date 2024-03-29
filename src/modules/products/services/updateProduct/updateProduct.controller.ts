import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UpdateProductService } from './updateProduct.service';

export class UpdateProductController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price } = req.body;

        const updateProductService = container.resolve(UpdateProductService);

        const { statusCode, data } = await updateProductService.execute({
            id,
            name,
            description,
            price,
        });

        return res.status(statusCode).json(data);
    }
}
