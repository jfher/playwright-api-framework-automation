import { test as base } from '@playwright/test';
import { AuthClient } from '@api/clients/AuthClient';
import { BookingClient } from '@api/clients/BookingClient';
import { credentials } from '@config/credentials';

type ApiFixtures = {
    authClient: AuthClient;
    bookingClient: BookingClient;
    authToken: string;
};

export const test = base.extend<ApiFixtures>({
    authClient: async ({ request }, use) => {
        await use(
            new AuthClient(request)
        );
    },

    bookingClient: async ({ request }, use) => {
        await use(
            new BookingClient(request)
        );
    },

    authToken: async ({ request }, use) => {
        const authClient = new AuthClient(request);
        const response = await authClient.login(credentials.validUser);
        await use(response.token);
    }

});

export { expect } from '@playwright/test';