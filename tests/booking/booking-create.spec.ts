import { test, expect } from '@fixtures/api.fixture';
import { bookingResponseSchema } from '@schemas/booking.schema';
import { expectStatus } from '@utils/api-assertions';
import { createBookingData } from '@utils/data-generator';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';
import { validateSchema } from '@utils/schema-validator';

test.describe('Booking Create API', () => {
  test('Should create a booking successfully', { tag: ['@booking', '@smoke'] }, async ({ bookingClient }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Create Booking',
    );

    await setStory(
      'Create booking successfully',
    );

    await severityByTag(
      ['@smoke'],
    );

    const booking = createBookingData();
    const response = await bookingClient.createBookingResponse(booking);

    await expectStatus(response, 200);

    const body = await response.json();
    const validated = validateSchema(bookingResponseSchema, body);

    expect(validated.bookingid).toBeGreaterThan(0);
    expect(validated.booking.firstname).toBe(booking.firstname);
    expect(validated.booking.lastname).toBe(booking.lastname);
    expect(validated.booking.totalprice).toBe(booking.totalprice);
  });
});
