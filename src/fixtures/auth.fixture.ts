import { test as base } from '@playwright/test';
import { AuthClient } from '@api/clients/AuthClient';
import { credentials } from '@config/credentials';

type AuthFixtures = {
  authClient: AuthClient;
  authToken: string;
};

export const authTest = base.extend<AuthFixtures>({
  authClient: async ({ request }, use, testInfo) => {
    const client = new AuthClient(request, testInfo);
    await use(client);
  },

  authToken: async ({ authClient }, use) => {
    const response = await authClient.login(credentials.validUser);
    await use(response.token);
  },
});
