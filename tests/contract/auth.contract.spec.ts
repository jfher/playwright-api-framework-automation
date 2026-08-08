import { test, expect } from '@fixtures/api.fixture';
import { credentials } from '@config/credentials';
import { authResponseSchema } from '@schemas/auth.schema';
import { validateSchema } from '@utils/schema-validator';

test.describe('Authentication Contract', () => {
  test('Login response should match contract', { tag: ['@authentication', '@contract'] }, async ({ authClient }) => {
    const response = await authClient.login(credentials.validUser);
    const validatedResponse = validateSchema(authResponseSchema, response);

    expect(validatedResponse.token).toBeTruthy();
  });
});
