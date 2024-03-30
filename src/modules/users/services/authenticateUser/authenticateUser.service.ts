import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ResponseFormat } from 'src/shared/providers/ResponseFormat';
import { IUsersRepository } from '../../repository/interface/IUsers.repository';
import {
    AuthenticateUserDTO,
    authenticateUserSchema,
} from '../../dtos/authenticateUser.dto';

@injectable()
export class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        email,
        password,
    }: AuthenticateUserDTO): Promise<ResponseFormat> {
        try {
            authenticateUserSchema.parse({ email, password });
        } catch (error) {
            return new ResponseFormat(500, error.message);
        }

        try {
            const user = await this.usersRepository.findByEmail(email);

            if (!user) {
                return new ResponseFormat(404, {
                    message: 'User not found',
                });
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                return new ResponseFormat(401, {
                    message: 'Incorrect password',
                });
            }

            const secret_token = process.env.SECRET_TOKEN as string;
            const expires_in_token = process.env.EXPIRES_IN_TOKEN;

            const token = sign({}, secret_token, {
                subject: user.id,
                expiresIn: expires_in_token,
            });

            return new ResponseFormat(200, { token, user });
        } catch (error) {
            return new ResponseFormat(500, error.message);
        }
    }
}
