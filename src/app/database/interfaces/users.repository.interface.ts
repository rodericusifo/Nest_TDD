import { User } from '@app/database/entities/user.entity';

export interface IUsersRepository {
  saveUser(data: Partial<User>): Promise<User>;
  findUserWithEmail(data: Partial<User>): Promise<User>;
}
