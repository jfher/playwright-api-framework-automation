import { test, expect } from '@fixtures/api.fixture';
import { createBookingData } from '@utils/data-generator';

test.describe('Booking Delete API', () => {
  test('Should delete booking successfully', { tag: ['@booking', '@regression'] }, async ({ bookingClient, authToken }) => {
    const booking = await bookingClient.createBooking(createBookingData());
    const response = await bookingClient.deleteBookingResponse(booking.bookingid, authToken);

    expect(response.status()).toBe(201);
  });
});
