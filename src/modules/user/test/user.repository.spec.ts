import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { PrismaService } from '../../../prisma.service';
import { UserRepository } from '../repository/user.repository';
import { AppError } from '../../../common/errors/Error';
import {
  MockAccessToken,
  MockAlmaUser,
  MockCreateUserAxiosResponse,
  MockCreateUserDto,
  MockGetUserAxiosResponse,
  MockUser,
  MockUserData,
} from './mocks/user.mock';

jest.mock('axios');

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository, PrismaService],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('handle alma api requests', () => {
    it('should make a post request and return response data', async () => {
      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockResolvedValueOnce(MockCreateUserAxiosResponse);

      const path = 'example.com/api/create';

      const result = await userRepository['almaRequest'](
        path,
        null,
        'post',
        MockCreateUserDto,
      );

      expect(axios.post).toHaveBeenCalledWith(
        path,
        MockCreateUserDto,
        expect.objectContaining({
          headers: {
            Authorization: `Bearer ${null}`,
          },
        }),
      );
      expect(result).toEqual(MockCreateUserAxiosResponse.data);
    });

    it('should make a get request and return response data', async () => {
      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockResolvedValueOnce(MockGetUserAxiosResponse);

      const path = 'example.com/api/';

      const result = await userRepository['almaRequest'](
        path,
        MockAccessToken,
        'get',
      );

      expect(axios.get).toHaveBeenCalledWith(
        path,
        expect.objectContaining({
          headers: {
            Authorization: `Bearer ${MockAccessToken}`,
          },
        }),
      );
      expect(result).toEqual(MockGetUserAxiosResponse.data);
    });

    it('should throw an AppError if request fails', async () => {
      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockRejectedValueOnce(AppError);

      const path = 'example.com/api/';

      try {
        await userRepository['almaRequest'](path, MockAccessToken, 'patch');
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect(error.code).toBe(500);
        expect(error.message).toBe('Internal server error');
      }
    });
  });

  describe('format user responses', () => {
    it('should format user properties to camelCase', () => {
      const result = userRepository['formatUserResponse'](
        MockUser.id,
        MockAlmaUser,
      );
      expect(result).toEqual(MockUserData);
    });
  });
});
