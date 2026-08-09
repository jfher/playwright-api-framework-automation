import type { AuthRequest } from '@models/Auth';
import { TestCase } from './test-case';

export type InvalidAuthData = Partial<AuthRequest>;

export const invalidAuthCases: TestCase<InvalidAuthData>[] = [
  {
    name: 'invalid username',
    data: {
      username: 'invalid-user',
      password: 'password123',
    },
    expectedStatus: 200,
    tags: ['regression'],
  },

  {
    name: 'invalid password',
    data: {
      username: 'admin',
      password: 'invalid-password',
    },
    expectedStatus: 200,
    tags: ['regression'],
  },

  {
    name: 'empty username',
    data: {
      username: '',
      password: 'password123',
    },
    expectedStatus: 200,
    tags: ['regression'],
  },

  {
    name: 'empty password',
    data: {
      username: 'admin',
      password: '',
    },
    expectedStatus: 200,
    tags: ['regression'],
  },

  {
    name: 'missing username',
    data: {
      password: 'password123',
    },
    expectedStatus: 200,
    tags: ['regression'],
  },

  {
    name: 'missing password',
    data: {
      username: 'admin',
    },
    expectedStatus: 200,
    tags: ['regression'],
  },
];
