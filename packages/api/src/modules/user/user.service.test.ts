import { Repository, EntitySchema } from 'typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';

type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

type RepositoryMock<T> = Pick<Repository<T>, 'findOne'>;

const repoMockFactory: () => MockType<RepositoryMock<EntitySchema>> = jest.fn(
  () => ({
    findOne: jest.fn(entity => entity),
    findOneOrFail: jest.fn(entity => entity),
    find: jest.fn(entity => entity),
    update: jest.fn(entity => entity),
    save: jest.fn(entity => entity),
    create: jest.fn(entity => entity),
  }),
);

const mockRequest = (session: object, body: object) => ({
  session,
  body,
});

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: MockType<Repository<UserEntity>>;

  const salt = bcryptjs.genSaltSync();
  const user = new UserEntity();

  Object.assign(user, {
    id: 1,
    // eslint-disable-next-line @typescript-eslint/camelcase
    first_name: 'Test',
    // eslint-disable-next-line @typescript-eslint/camelcase
    last_name: 'User',
    email: 'test@user.com',
    password: bcryptjs.hashSync('password', salt),
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repoMockFactory,
        },
        ConfigService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  it('should be server defined', () => {
    expect(userService).toBeDefined();
  });

  describe('register', () => {
    it('should succeed', async () => {
      const userResult = user;
      jest
        .spyOn(userService, 'register')
        .mockImplementation(async () => userResult);

      const result = await userService.register(user);
      expect(result).toBe(user);
    });
  });

  describe('login', () => {
    const req: any = mockRequest({}, {});

    it('should succeed', async () => {
      const input = {
        email: 'user@test.com',
        password: 'password',
      };

      userRepositoryMock.findOneOrFail.mockReturnValue(user);
      try {
        const result = await userService.login(input, req);
        expect(result).toEqual({ sessionId: undefined, user });
      } catch (error) {
        throw error;
      }
    });

    it('should fail', async () => {
      const input = {
        email: 'wrong@test.com',
        password: 'password',
      };

      userRepositoryMock.findOneOrFail.mockReturnValue(user);

      try {
        await userService.login(input, req);
      } catch (error) {
        expect(error).toThrow('Invalid email or password');
      }
    });
  });

  describe('validateUserSession', () => {
    it('should return session', async () => {
      const userId = user.id;
      const req: any = mockRequest({ userId }, { query: [] });
      userRepositoryMock.findOneOrFail.mockReturnValue(user);
      const result = await userService.validateUserSession(req);
      expect(result.id).toBe(user.id);
    });

    it('should have null session', async () => {
      const req: any = mockRequest({}, { query: [] });
      userRepositoryMock.findOneOrFail.mockReturnValue(user);
      const result = await userService.validateUserSession(req);
      expect(result).toBeNull();
    });
  });
});
