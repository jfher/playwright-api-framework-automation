import { test, expect } from '@fixtures/api.fixture';
import { credentials } from '@config/credentials';
import { authErrorSchema } from '@schemas/auth.schema';
import { validateSchema } from '@utils/schema-validator';

test.describe('Authentication Negative API', () => {
  test('Invalid credentials should return expected contract', { tag: ['@auth', '@regression', '@negative'] }, async ({ request }) => {
    const response = await request.post('/auth', {
      data: credentials.invalidUser,
    });

    const body = await response.json();
    const validatedResponse = validateSchema(authErrorSchema, body);

    expect(validatedResponse.reason).toBe('Bad credentials');
  });
});
