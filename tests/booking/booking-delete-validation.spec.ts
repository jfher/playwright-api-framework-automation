import { test, expect } from '@fixtures/api.fixture';

test.describe('Booking Delete Validation', () => {
  test('Deleted booking should no longer be accessible', { tag: ['@booking', '@validation', '@regression'] }, async ({ bookingClient, bookingId, authToken }) => {
    const deleteResponse = await bookingClient.deleteBookingResponse(bookingId, authToken);

    expect(deleteResponse.status()).toBe(201);

    const getResponse = await bookingClient.getBookingResponse(bookingId);

    expect(getResponse.status()).toBe(404);
  });
});
