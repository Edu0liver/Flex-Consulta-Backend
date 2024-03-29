import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { DeleteProductService } from './deleteProduct.service';

export class DeleteProductController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const deleteProductService = container.resolve(DeleteProductService);

        const { statusCode, data } = await deleteProductService.execute({
            id,
        });

        return res.status(statusCode).json(data);
    }
}
