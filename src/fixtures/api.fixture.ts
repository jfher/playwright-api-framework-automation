import { test as base } from '@playwright/test';
import { AuthClient } from '@api/clients/AuthClient';
import { BookingClient } from '@api/clients/BookingClient';

type ApiFixtures = {
    authClient: AuthClient;
    bookingClient: BookingClient;
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
    }
});

export { expect } from '@playwright/test';