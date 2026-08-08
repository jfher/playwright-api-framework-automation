import { test, expect } from '@fixtures/api.fixture';
import { createBookingData } from '@utils/data-generator';
import { bookingResponseSchema } from '@schemas/booking.schema';
import { validateSchema } from '@utils/schema-validator';

test.describe('Booking Create Contract', () => {
  test(
    'Response should match booking contract',
    { tag: ['@contract', '@booking'] },
    async ({ bookingClient }) => {
      const booking = createBookingData();
      const response = await bookingClient.createBooking(booking);

      const validatedResponse = validateSchema(bookingResponseSchema, response);

      expect(validatedResponse.bookingid).toBeGreaterThan(0);
    },
  );
});
