import { credentials } from '@config/credentials';
import { test, expect } from '@fixtures/api.fixture';
import { authResponseSchema } from '@schemas/auth.schema';
import { attachJson } from '@utils/allure';
import { expectStatus } from '@utils/api-assertions';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';

test.describe('Authentication API', () => {
  test('User should login successfully', { tag: ['@authentication', '@smoke'] }, async ({ authClient }) => {
    await setEpic(
      'Authentication',
    );

    await setFeature(
      'Login',
    );

    await setStory(
      'Valid credentials',
    );

    await severityByTag(
      ['@smoke'],
    );

    const response = await authClient.login(credentials.validUser);
    await attachJson('Authentication Response', response);

    expect(response.token).toBeTruthy();
  });

  test('should authenticate with valid credentials', { tag: ['@authentication', '@smoke'] }, async ({ authClient }) => {

    await setEpic(
      'Authentication',
    );


    await setFeature(
      'Login',
    );


    await setStory(
      'Valid credentials',
    );


    await severityByTag(
      ['@smoke'],
    );

    const response = await authClient.loginResponse(credentials.validUser);
    expectStatus(response, 200);

    const body = await response.json();
    const result = authResponseSchema.safeParse(body);

    expect(result.success, 'Expected a valid authentication response').toBe(true);
    if (result.success) {
      expect(result.data.token).toBeTruthy();
    }
  });
});
