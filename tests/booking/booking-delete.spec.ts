import { test, expect } from '@fixtures/api.fixture';

test.describe('Booking Delete API', () => {
  test(
    'Should delete booking successfully',
    { tag: ['@booking', '@regression'] },
    async ({ bookingClient, bookingId, authToken }) => {
      const response = await bookingClient.deleteBooking(bookingId, authToken);

      expect(response.status()).toBe(201);
    },
  );
});
