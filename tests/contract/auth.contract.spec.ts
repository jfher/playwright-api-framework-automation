import { test, expect } from '@fixtures/api.fixture';
import { credentials } from '@config/credentials';
import { authResponseSchema } from '@schemas/auth.schema';
import { validateSchema } from '@utils/schema-validator';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';

test.describe('Authentication Contract', () => {
  test('Login response should match contract', { tag: ['@authentication', '@contract'] }, async ({ authClient }) => {
    await setEpic(
      'Authentication',
    );

    await setFeature(
      'Contract Testing',
    );

    await setStory(
      'Login response should match contract',
    );

    await severityByTag(
      ['@contract'],
    );

    const response = await authClient.login(credentials.validUser);
    const validatedResponse = validateSchema(authResponseSchema, response);

    expect(validatedResponse.token).toBeTruthy();
  });
});
