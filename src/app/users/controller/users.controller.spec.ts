import { UsersController } from '@app/users/controller/users.controller';
import { UserDTO } from '@app/users/dto/user.dto';
import { CreateUserBodyRequest } from '@app/users/request/body/create-user.body.request';
import { IUsersService } from '@app/users/service/interface/users.service.interface';
import { UsersService } from '@app/users/service/users.service';
import { UsersMockService } from '@app/users/service/__mocks__/users.mock.service';
import { IResponse } from '@lib/interfaces/response.interface';
import { ResponseModule } from '@lib/modules/response/response.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSuccessResponse } from '@shared/constants/response/success/user.response.success';
import { randomUUID } from 'crypto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: IUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ResponseModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: UsersMockService,
        },
      ],
    }).compile();

    usersController = module.get(UsersController);
    usersService = module.get(UsersService);
  });

  it('Should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('createUser()', () => {
    it('Should success create user', async () => {
      const bodyArgument: CreateUserBodyRequest = {
        name: 'Rodericus Ifo Krista',
        email: 'ifo@gmail.com',
        password: 'hello123',
      };
      const UUIDV1 = randomUUID();
      const DateV1 = new Date();
      const DTOResult: UserDTO = {
        id: UUIDV1,
        name: 'Rodericus Ifo Krista',
        email: 'ifo@gmail.com',
        password: 'encrypted-hello123',
        createdAt: DateV1,
        updatedAt: DateV1,
        deletedAt: null,
      };
      const expectedResult: IResponse<UserDTO> = {
        success: true,
        message: UserSuccessResponse.CREATE_USER_SUCCESS,
        data: DTOResult,
      };
      const expectedError = undefined;
      try {
        jest
          .spyOn(usersService, 'createUser')
          .mockImplementation(() => Promise.resolve(DTOResult));
        const result = await usersController.createUser(bodyArgument);
        expect(result).toEqual(expectedResult);
      } catch (error) {
        expect(error).toEqual(expectedError);
      }
    });
  });
});
