import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { CreateUserService } from '../services/create-user.service';
import { FindUserService } from '../services/find-user.service';
import { UpdateUserService } from '../services/update-user.service';
import { DeleteUserService } from '../services/delete-user.service';
import {
  MockAccessToken,
  MockCreateUserDto,
  MockIUser,
  MockUserData,
  MockUserFromJwt,
} from './mocks/user.mock';

describe('UserController', () => {
  let controller: UserController;
  let createUserService: CreateUserService;
  let findUserService: FindUserService;
  let updateUserService: UpdateUserService;
  let deleteUserService: DeleteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(MockIUser),
          },
        },
        {
          provide: FindUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(MockUserData),
          },
        },
        {
          provide: UpdateUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(MockUserData),
          },
        },
        {
          provide: DeleteUserService,
          useValue: {
            execute: jest.fn().mockResolvedValue(MockUserData),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUserService = module.get<CreateUserService>(CreateUserService);
    findUserService = module.get<FindUserService>(FindUserService);
    updateUserService = module.get<UpdateUserService>(UpdateUserService);
    deleteUserService = module.get<DeleteUserService>(DeleteUserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create user', () => {
    it('should create a new user successfully', async () => {
      const result = await controller.create(MockCreateUserDto);

      expect(createUserService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockIUser);
    });

    it('should throw an error', () => {
      jest
        .spyOn(createUserService, 'execute')
        .mockRejectedValueOnce(new Error());

      expect(controller.create(MockCreateUserDto)).rejects.toThrow();
    });
  });

  describe('find one user', () => {
    it('should get an user by access token successfully', async () => {
      const result = await controller.findOne(MockAccessToken, MockUserFromJwt);

      expect(findUserService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockUserData);
    });

    it('should throw an error', () => {
      jest.spyOn(findUserService, 'execute').mockRejectedValueOnce(new Error());

      expect(
        controller.findOne(MockAccessToken, MockUserFromJwt),
      ).rejects.toThrow();
    });
  });
});
