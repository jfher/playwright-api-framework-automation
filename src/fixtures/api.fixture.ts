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
  authClient: async ({ request }, use, testInfo) => {
    await use(new AuthClient(request, testInfo));
  },

  bookingClient: async ({ request }, use, testInfo) => {
    await use(new BookingClient(request, testInfo));
  },

  authToken: async ({ authClient }, use) => {
    const response = await authClient.login(credentials.validUser);
    await use(response.token);
  },

  bookingId: async ({ bookingClient, authToken }, use) => {
    const response = await bookingClient.createBooking(createBookingData());
    const bookingId = response.bookingid;

    await use(bookingId);

    await bookingClient.deleteBookingResponse(bookingId, authToken);
  },
});

export { expect } from '@playwright/test';
