import { test, expect } from '@fixtures/api.fixture';
import { bookingSchema } from '@schemas/booking.schema';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';
import { validateSchema } from '@utils/schema-validator';

test.describe('Booking Get API', () => {
  test('Should retrieve booking by id', { tag: ['@booking', '@regression'] }, async ({ bookingClient, bookingId }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Get Booking',
    );

    await setStory(
      'Should retrieve booking by id',
    );

    await severityByTag(
      ['@regression'],
    );

    const response = await bookingClient.getBookingResponse(bookingId);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const booking = validateSchema(bookingSchema, body);

    expect(booking.firstname).toBeTruthy();
    expect(booking.lastname).toBeTruthy();
    expect(booking.bookingdates).toBeTruthy();
  });
});
