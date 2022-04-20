import { User } from '@app/database/entities/user.entity';
import { IUsersRepository } from '@app/database/interfaces/users.repository.interface';
import { UsersRepository } from '@app/database/repositories/users.repository';
import { UsersMockRepository } from '@app/database/repositories/__mocks__/users.mock.repository';
import { CreateUserDTO } from '@app/users/dto/create-user.dto';
import { UserDTO } from '@app/users/dto/user.dto';
import { IUsersService } from '@app/users/service/interface/users.service.interface';
import { UsersService } from '@app/users/service/users.service';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserErrorResponse } from '@shared/constants/response/error/user.response.error';
import { plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

describe('UsersService', () => {
  let usersService: IUsersService;
  let usersRepository: IUsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useClass: UsersMockRepository,
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get(getRepositoryToken(UsersRepository));
  });

  it('Should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('createUser()', () => {
    it('Should success create user', async () => {
      const argument: CreateUserDTO = {
        body: {
          name: 'Rodericus Ifo Krista',
          email: 'ifo@gmail.com',
          password: 'hello123',
        },
      };
      const UUIDV1 = randomUUID();
      const DateV1 = new Date();
      const expectedResult: UserDTO = {
        id: UUIDV1,
        name: 'Rodericus Ifo Krista',
        email: 'ifo@gmail.com',
        password: 'encrypted-hello123',
        createdAt: DateV1,
        updatedAt: DateV1,
        deletedAt: null,
      };
      const expectedError = undefined;
      try {
        jest
          .spyOn(usersRepository, 'findUserWithEmail')
          .mockImplementation(() => Promise.resolve(null));
        jest
          .spyOn(usersRepository, 'saveUser')
          .mockImplementation(() =>
            Promise.resolve(plainToClass(User, expectedResult)),
          );
        const result = await usersService.createUser(argument);
        expect(result).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });

    it('Should fail if create user which have already exist in database', async () => {
      const argument: CreateUserDTO = {
        body: {
          name: 'Rodericus Ifo Krista',
          email: 'ifo@gmail.com',
          password: 'hello123',
        },
      };
      const expectedResult: UserDTO = undefined;
      const expectedError = new BadRequestException(
        UserErrorResponse.ALREADY_EXIST,
      );
      try {
        jest
          .spyOn(usersRepository, 'findUserWithEmail')
          .mockImplementation(() =>
            Promise.resolve(
              plainToClass(User, {
                id: randomUUID(),
                name: 'Rodericus Ifo Krista',
                email: 'ifo@gmail.com',
                password: 'encrypted-hello123',
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
              }),
            ),
          );
        const result = await usersService.createUser(argument);
        expect(result).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
