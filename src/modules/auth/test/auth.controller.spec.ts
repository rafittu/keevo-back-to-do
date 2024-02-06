import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { SignInService } from '../services/signin.service';
import {
  MockAccessToken,
  MockUserCredentials,
  MockUserFromJwt,
} from './mocks/auth.mock';

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

  describe('user signin', () => {
    it('user should sign in successfully', async () => {
      const result = await controller.signIn(MockUserCredentials);

      expect(signInService.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockAccessToken);
    });
  });

  describe('get user by access token decorator', () => {
    it('should decode access token and return user payload', async () => {
      const result = controller.getMe(MockUserFromJwt);

      expect(result).toEqual(MockUserFromJwt);
    });
  });
});
