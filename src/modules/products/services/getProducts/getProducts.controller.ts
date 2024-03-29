import { container } from 'tsyringe';
import { getProductsSchema } from '../../dtos/getProducts.dto';
import { GetProductsService } from './getProducts.service';
import { Request, Response } from 'express';

export class GetProductsController {
    async handle(req: Request, res: Response) {
        console.log(req.query);
        const { name, description, order_by, order } = req.query;

        const getProductsService = container.resolve(GetProductsService);

        const { statusCode, data } = await getProductsService.execute({
            name: name as string,
            description: description as string,
            order_by: order_by as string,
            order: order as string,
        });

        return res.status(statusCode).json(data);
    }
}
