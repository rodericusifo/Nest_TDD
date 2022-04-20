import { User } from '@app/database/entities/user.entity';
import { IUsersRepository } from '@app/database/interfaces/users.repository.interface';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UsersRepository
  extends Repository<User>
  implements IUsersRepository
{
  findUserWithEmail(data: Partial<User>): Promise<User> {
    return this.findOne({
      where: {
        email: data.email,
      },
    });
  }
  saveUser(data: Partial<User>): Promise<User> {
    return this.save(data);
  }
}
