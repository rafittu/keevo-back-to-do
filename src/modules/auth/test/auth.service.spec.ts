import { Test, TestingModule } from '@nestjs/testing';
import { SignInService } from '../services/signin.service';
import { AuthRepository } from '../repository/auth.repository';
import { MockAccessToken, MockUserCredentials } from './mocks/auth.mock';

describe('AuthService', () => {
  let signInService: SignInService;

  let authRepository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignInService,
        {
          provide: AuthRepository,
          useValue: {
            signIn: jest.fn().mockResolvedValue(MockAccessToken),
          },
        },
      ],
    }).compile();

    signInService = module.get<SignInService>(SignInService);

    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(signInService).toBeDefined();
  });

  describe('user sign in', () => {
    it('user should sign in successfully', async () => {
      const result = await signInService.execute(MockUserCredentials);

      expect(authRepository.signIn).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockAccessToken);
    });
  });
});
