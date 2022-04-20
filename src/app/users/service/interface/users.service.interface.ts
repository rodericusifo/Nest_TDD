import { CreateUserDTO } from '@app/users/dto/create-user.dto';
import { UserDTO } from '@app/users/dto/user.dto';

export interface IUsersService {
  createUser(payload: CreateUserDTO): Promise<UserDTO>;
}
