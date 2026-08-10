import { test, expect } from '@fixtures/api.fixture';
import { bookingIdsSchema, bookingSchema } from '@schemas/booking.schema';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';
import { validateSchema } from '@utils/schema-validator';

test.describe('Booking Get Contract', () => {
  test('Response should match booking contract', { tag: ['@contract', '@booking'] }, async ({ bookingClient, bookingId }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Get Booking Contract',
    );

    await setStory(
      'Response should match booking contract',
    );

    await severityByTag(
      ['@contract'],
    );

    const response = await bookingClient.getBooking(bookingId);

    const validatedResponse = validateSchema(bookingSchema, response);

    expect(validatedResponse.firstname).toBeTruthy();
    expect(validatedResponse.lastname).toBeTruthy();
  });

  test('Response should match booking contracts', { tag: ['@contract', '@booking'] }, async ({ bookingClient }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Get All Bookings Contract',
    );

    await setStory(
      'Response should match booking contracts',
    );

    await severityByTag(
      ['@contract'],
    );

    const response = await bookingClient.getBookings();

    const validatedResponse = validateSchema(bookingIdsSchema, response);

    expect(validatedResponse).toBeTruthy();
    expect(validatedResponse.length).toBeGreaterThan(0);
  });
});
