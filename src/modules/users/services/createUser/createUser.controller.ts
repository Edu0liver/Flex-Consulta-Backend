import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from './createUser.service';

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const createUserService = container.resolve(CreateUserService);

        const { statusCode, data } = await createUserService.execute({
            email,
            password,
        });

        return res.status(statusCode).json(data);
    }
}
