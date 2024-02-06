import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '../services/create-user.service';
import { FindUserService } from '../services/find-user.service';
import { UpdateUserService } from '../services/update-user.service';
import { DeleteUserService } from '../services/delete-user.service';
import { UserRepository } from '../repository/user.repository';
import {
  MockAccessToken,
  MockCreateUserDto,
  MockUpdateUserDto,
  MockUser,
  MockUserData,
  MockUserFromJwt,
} from './mocks/user.mock';
import { AppError } from '../../../common/errors/Error';

describe('User Services', () => {
  let createUserService: CreateUserService;
  let findUserService: FindUserService;
  let updateUserService: UpdateUserService;
  let deleteUserService: DeleteUserService;

  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        FindUserService,
        UpdateUserService,
        DeleteUserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn().mockResolvedValue(MockUser),
            findById: jest.fn().mockResolvedValue(MockUserData),
            updateUser: jest.fn().mockResolvedValue(MockUserData),
            deleteUser: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
    findUserService = module.get<FindUserService>(FindUserService);
    updateUserService = module.get<UpdateUserService>(UpdateUserService);
    deleteUserService = module.get<DeleteUserService>(DeleteUserService);

    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(createUserService).toBeDefined();
    expect(findUserService).toBeDefined();
    expect(updateUserService).toBeDefined();
    expect(deleteUserService).toBeDefined();
  });

  describe('create user', () => {
    it('should create a new one successfully', async () => {
      const result = await createUserService.execute(MockCreateUserDto);

      expect(userRepository.createUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockUser);
    });

    it('should throw an App Error', async () => {
      jest
        .spyOn(userRepository, 'createUser')
        .mockRejectedValueOnce(
          new AppError('error.code', 409, 'Error message'),
        );

      try {
        await createUserService.execute(MockCreateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(409);
      }
    });

    it('should throw an internal error', async () => {
      jest
        .spyOn(userRepository, 'createUser')
        .mockRejectedValueOnce(new Error());

      try {
        await createUserService.execute(MockCreateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
      }
    });
  });

  describe('find user by id', () => {
    it('should get an user successfully', async () => {
      const result = await findUserService.execute(
        MockUserFromJwt.almaId,
        MockAccessToken,
      );

      expect(userRepository.findById).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockUserData);
    });
  });

  describe('update user', () => {
    it('should update an user successfully', async () => {
      const result = await updateUserService.execute(
        MockAccessToken,
        MockUpdateUserDto,
      );

      expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockUserData);
    });
  });

  describe('delete user', () => {
    it('should delete an user successfully', async () => {
      const result = await deleteUserService.execute(
        MockUserFromJwt.almaId,
        MockAccessToken,
      );

      expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(null);
    });
  });
});
