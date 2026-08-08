import { test as base } from '@playwright/test';
import { AuthClient } from '@api/clients/AuthClient';
import { BookingClient } from '@api/clients/BookingClient';
import { credentials } from '@config/credentials';
import { createBookingData } from '@utils/data-generator';

type ApiFixtures = {
  authClient: AuthClient;
  bookingClient: BookingClient;
  authToken: string;
  bookingId: number;
};

export const test = base.extend<ApiFixtures>({
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },

  bookingClient: async ({ request }, use) => {
    await use(new BookingClient(request));
  },

  authToken: async ({ request }, use) => {
    const authClient = new AuthClient(request);
    const response = await authClient.login(credentials.validUser);
    await use(response.token);
  },

  bookingId: async ({ bookingClient }, use) => {
    const response = await bookingClient.createBooking(createBookingData());
    await use(response.bookingid);
  },
});

export { expect } from '@playwright/test';
