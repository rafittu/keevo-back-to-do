import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { SignInService } from '../services/signin.service';
import { MockAccessToken } from './mocks/auth.mock';

describe('AuthController', () => {
  let controller: AuthController;

  let signInService: SignInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: SignInService,
          useValue: {
            execute: jest.fn().mockResolvedValue(MockAccessToken),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    signInService = module.get<SignInService>(SignInService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
