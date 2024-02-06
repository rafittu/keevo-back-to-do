import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { PrismaService } from '../../../prisma.service';
import { AuthRepository } from '../repository/auth.repository';
import { AppError } from '../../../common/errors/Error';
import {
  MockSignInAxiosResponse,
  MockUserCredentials,
} from './mocks/auth.mock';

jest.mock('axios');

describe('AuthRepository', () => {
  let authRepository: AuthRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepository, PrismaService],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(authRepository).toBeDefined();
  });

  describe('handle external api request to login', () => {
    it('should make a post request and return response data', async () => {
      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockResolvedValueOnce(MockSignInAxiosResponse);

      const path = 'example.com/api';

      const result = await authRepository['almaRequest'](
        path,
        MockUserCredentials,
      );

      expect(axios.post).toHaveBeenCalledWith(path, MockUserCredentials);
      expect(result).toEqual(MockSignInAxiosResponse.data);
    });

    it('should throw an AppError if request fails', async () => {
      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockRejectedValueOnce(AppError);

      const path = 'example.com/api/:id';

      try {
        await authRepository['almaRequest'](path, MockUserCredentials);
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('Internal server error');
      }
    });
  });
});
