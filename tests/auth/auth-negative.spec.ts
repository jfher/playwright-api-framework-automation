import { test, expect } from '@fixtures/api.fixture';
import { credentials } from '@config/credentials';
import { authErrorResponseSchema } from '@schemas/auth.schema';
import { validateSchema } from '@utils/schema-validator';
import { invalidAuthCases } from '@utils/test-data/auth-negative-data';

test.describe('Authentication Negative API', () => {
  test('Invalid credentials should return expected contract', { tag: ['@auth', '@regression', '@negative'] }, async ({ request }) => {
    const response = await request.post('/auth', {
      data: credentials.invalidUser,
    });

    const body = await response.json();
    const validatedResponse = validateSchema(authErrorResponseSchema, body);

    expect(validatedResponse.reason).toBe('Bad credentials');
  });
});

test.describe('Authentication Negative Tests', () => {
  for (const testCase of invalidAuthCases) {
    test(`${testCase.name}`, { tag: ['@auth', '@regression', '@negative'] }, async ({ authClient }) => {
      const response = await authClient.loginResponse(testCase.data);
      expect(response.status()).toBe(testCase.expectedStatus);

      const body = await response.json();
      const result = authErrorResponseSchema.safeParse(body);
      expect(result.success, `Expected authentication error response for case: ${testCase.name}`).toBe(true);

      if (result.success) {
        expect(result.data.reason).toBeTruthy();
      }
    });
  }
});
