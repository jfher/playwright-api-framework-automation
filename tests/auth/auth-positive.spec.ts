import { credentials } from '@config/credentials';
import { environment } from '@config/environment';
import { test, expect } from '@fixtures/api.fixture';
import { attachJson } from '@utils/allure';

test.describe('Authentication API', () => {
  test(
    'User should login successfully',
    { tag: ['@authentication', '@smoke'] },
    async ({ authClient }) => {
      const response = await authClient.login(credentials.validUser);
      await attachJson('Authentication Response', response);

      expect(response.token).toBeTruthy();
    },
  );
});
