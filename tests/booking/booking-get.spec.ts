import { test, expect } from '@fixtures/api.fixture';

test.describe('Booking Get API', () => {
  test(
    'Should retrieve booking by id',
    { tag: ['@booking', '@regression'] },
    async ({ bookingClient, bookingId }) => {
      const response = await bookingClient.getBooking(bookingId);

      expect(response.firstname).toBeTruthy();
      expect(response.bookingdates).toBeTruthy();
    },
  );
});
