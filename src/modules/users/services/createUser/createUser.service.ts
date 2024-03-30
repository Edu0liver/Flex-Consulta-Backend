import { CreateUserDTO, createUserSchema } from '../../dtos/createUser.dto';
import { IUsersRepository } from '../../repository/interface/IUsers.repository';
import { ResponseFormat } from 'src/shared/providers/ResponseFormat';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(data: CreateUserDTO): Promise<ResponseFormat> {
        try {
            createUserSchema.parse(data);
        } catch (error) {
            throw new ResponseFormat(400, error.message);
        }

        try {
            const userAlreadyExists = await this.usersRepository.findByEmail(
                data.email,
            );

            if (userAlreadyExists) {
                throw new ResponseFormat(400, 'User already exists');
            }

            const user = await this.usersRepository.create(data);

            return new ResponseFormat(201, user);
        } catch (error) {
            throw new ResponseFormat(500, error.message);
        }
    }
}
