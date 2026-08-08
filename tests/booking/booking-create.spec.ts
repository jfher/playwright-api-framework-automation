import { test, expect } from '@fixtures/api.fixture';
import { bookingResponseSchema } from '@schemas/booking.schema';
import { createBookingData } from '@utils/data-generator';
import { validateSchema } from '@utils/schema-validator';

test.describe('Booking Create API', () => {
  test('Should create a booking successfully', { tag: ['@booking', '@smoke'] }, async ({ bookingClient }) => {
    const booking = createBookingData();
    const response = await bookingClient.createBookingResponse(booking);

    expect(response.status()).toBe(200);
    const body = await response.json();

    const validated = validateSchema(bookingResponseSchema, body);

    expect(validated.bookingid).toBeGreaterThan(0);
    expect(validated.booking.firstname).toBe(booking.firstname);
    expect(validated.booking.lastname).toBe(booking.lastname);
    expect(validated.booking.totalprice).toBe(booking.totalprice);
  });
});
