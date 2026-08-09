import type { AuthRequest } from '@models/Auth';

export interface InvalidAuthCase {
  name: string;
  credentials: Partial<AuthRequest>;
  expectedStatus: number;
  expectedToken?: string;
}

export const invalidAuthCases: InvalidAuthCase[] = [
  {
    name: 'invalid username',
    credentials: {
      username: 'invalid-user',
      password: 'password123',
    },
    expectedStatus: 200,
  },

  {
    name: 'invalid password',
    credentials: {
      username: 'admin',
      password: 'invalid-password',
    },
    expectedStatus: 200,
  },

  {
    name: 'empty username',
    credentials: {
      username: '',
      password: 'password123',
    },
    expectedStatus: 200,
  },

  {
    name: 'empty password',
    credentials: {
      username: 'admin',
      password: '',
    },
    expectedStatus: 200,
  },

  {
    name: 'missing username',
    credentials: {
      password: 'password123',
    },
    expectedStatus: 200,
  },

  {
    name: 'missing password',
    credentials: {
      username: 'admin',
    },
    expectedStatus: 200,
  },
];
