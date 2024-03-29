import { container } from 'tsyringe';
import { getProductsSchema } from '../../dtos/getProducts.dto';
import { GetProductsService } from './getProducts.service';
import { Request, Response } from 'express';

export class GetProductsController {
    async handle(req: Request, res: Response) {
        const { name, description, order_by, order } = getProductsSchema.parse(
            req.query,
        );

        const getProductsService = container.resolve(GetProductsService);

        const products = await getProductsService.execute({
            name,
            description,
            order_by,
            order,
        });

        return res.json(products);
    }
}
