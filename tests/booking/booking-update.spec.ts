import { test, expect } from '@fixtures/api.fixture';
import { bookingSchema } from '@schemas/booking.schema';
import { createBookingData } from '@utils/data-generator';
import { validateSchema } from '@utils/schema-validator';

test.describe('Booking Update API', () => {
  test('Should update booking successfully', { tag: ['@booking', '@regression'] }, async ({ bookingClient, bookingId, authToken }) => {
    const booking = createBookingData({
      firstname: 'Updated',
      lastname: 'Booking',
    });

    const response = await bookingClient.updateBookingResponse(bookingId, booking, authToken);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const updatedBooking = validateSchema(bookingSchema, body);

    expect(updatedBooking.firstname).toBe('Updated');
    expect(updatedBooking.lastname).toBe('Booking');
  });
});
