import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { AuthRepository } from '../repository/auth.repository';
import { AppError } from '../../../common/errors/Error';
import {
  MockAccessToken,
  MockSignInAxiosResponse,
  MockUserCredentials,
} from './mocks/auth.mock';

jest.mock('axios');

describe('AuthRepository', () => {
  let authRepository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepository],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
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

  describe('signIn', () => {
    it('user should sign in successfully', async () => {
      jest
        .spyOn(authRepository as any, 'almaRequest')
        .mockResolvedValueOnce({ accessToken: MockAccessToken });

      const result = await authRepository.signIn({
        ...MockUserCredentials,
        origin: 'WOPHI',
      });

      expect(authRepository['almaRequest']).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ accessToken: MockAccessToken });
    });

    it('should throw an AppError when almaRequest throws an error', async () => {
      jest
        .spyOn(authRepository as any, 'almaRequest')
        .mockRejectedValueOnce(
          new AppError('error.code', 400, 'Error message'),
        );

      try {
        await authRepository.signIn({
          ...MockUserCredentials,
          origin: 'WOPHI',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(400);
        expect(error.message).toBe('Error message');
      }
    });

    it('should throw an error if user could not sign in', async () => {
      jest
        .spyOn(authRepository as any, 'almaRequest')
        .mockRejectedValueOnce(new Error());

      try {
        await authRepository.signIn({
          ...MockUserCredentials,
          origin: 'WOPHI',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('internal server error');
      }
    });
  });
});
