import { test, expect } from '@fixtures/api.fixture';
import { createBookingData } from '@utils/data-generator';
import { bookingResponseSchema } from '@schemas/booking.schema';
import { validateSchema } from '@utils/schema-validator';
import { severityByTag } from '@utils/reporting/test-metadata';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';

test.describe('Booking Create Contract', () => {
  test('Response should match booking contract', { tag: ['@contract', '@booking'] }, async ({ bookingClient }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Booking Create Contract',
    );

    await setStory(
      'Response should match booking contract',
    );

    await severityByTag(
      ['@contract'],
    );

    const booking = createBookingData();
    const response = await bookingClient.createBooking(booking);

    const validatedResponse = validateSchema(bookingResponseSchema, response);

    expect(validatedResponse.bookingid).toBeGreaterThan(0);
  });
});
