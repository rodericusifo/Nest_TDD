import { User } from '@app/database/entities/user.entity';
import { IUsersRepository } from '@app/database/interfaces/users.repository.interface';
import { UsersRepository } from '@app/database/repositories/users.repository';
import { CreateUserDTO } from '@app/users/dto/create-user.dto';
import { UserDTO } from '@app/users/dto/user.dto';
import { IUsersService } from '@app/users/service/interface/users.service.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserErrorResponse } from '@shared/constants/response/error/user.response.error';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async createUser(payload: CreateUserDTO): Promise<UserDTO> {
    const user = plainToClass(User, { ...payload.body });
    const foundUser = await this.usersRepository.findUserWithEmail({
      email: user.email,
    });
    if (foundUser) {
      throw new BadRequestException(UserErrorResponse.ALREADY_EXIST);
    }
    user.encryptPassword();
    const savedUser = await this.usersRepository.saveUser(user);
    return plainToClass(UserDTO, { ...savedUser });
  }
}
