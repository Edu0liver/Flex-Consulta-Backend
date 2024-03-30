import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ResponseSender } from 'src/shared/providers/ResponseSender';
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
    }: AuthenticateUserDTO): Promise<ResponseSender> {
        try {
            authenticateUserSchema.parse({ email, password });
        } catch (error) {
            return new ResponseSender(500, error.message);
        }

        try {
            const user = await this.usersRepository.findByEmail(email);

            if (!user) {
                return new ResponseSender(404, {
                    message: 'User not found',
                });
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                return new ResponseSender(401, {
                    message: 'Incorrect password',
                });
            }

            const secret_token = process.env.SECRET_TOKEN as string;
            const expires_in_token = process.env.EXPIRES_IN_TOKEN;

            const token = sign({}, secret_token, {
                subject: user.id,
                expiresIn: expires_in_token,
            });

            return new ResponseSender(200, { token, user });
        } catch (error) {
            return new ResponseSender(500, error.message);
        }
    }
}
