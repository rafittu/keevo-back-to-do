import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '../services/create-user.service';
import { FindUserService } from '../services/find-user.service';
import { UpdateUserService } from '../services/update-user.service';
import { DeleteUserService } from '../services/delete-user.service';
import { UserRepository } from '../repository/user.repository';

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
            createUser: jest.fn().mockResolvedValue(''),
            findById: jest.fn().mockResolvedValue(''),
            updateUser: jest.fn().mockResolvedValue(''),
            deleteUser: jest.fn().mockResolvedValue(''),
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
});
