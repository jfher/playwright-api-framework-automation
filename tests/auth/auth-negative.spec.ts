import { test, expect } from '@fixtures/api.fixture';
import { credentials } from '@config/credentials';
import { authErrorResponseSchema } from '@schemas/auth.schema';
import { validateSchema } from '@utils/schema-validator';
import { invalidAuthCases } from '@utils/test-data/auth-negative-data';
import { expectStatus } from '@utils/api-assertions';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';

test.describe('Authentication Negative API', () => {
  test('Invalid credentials should return expected contract', { tag: ['@auth', '@regression', '@negative'] }, async ({ request }) => {

    await setEpic(
      'Authentication',
    );

    await setFeature(
      'Login',
    );

    await setStory(
      'Invalid credentials',
    );

    await severityByTag(
      ['@regression', '@negative'],
    );

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

      await setEpic(
        'Authentication',
      );

      await setFeature(
        'Login',
      );

      await setStory(
        `Invalid credentials - ${testCase.name}`,
      );

      await severityByTag(
        ['@regression', '@negative'],
      );
      const response = await authClient.loginResponse(testCase.data);
      expectStatus(response, testCase.expectedStatus);

      const body = await response.json();
      const result = authErrorResponseSchema.safeParse(body);
      expect(result.success, `Expected authentication error response for case: ${testCase.name}`).toBe(true);

      if (result.success) {
        expect(result.data.reason).toBeTruthy();
      }
    });
  }
});
