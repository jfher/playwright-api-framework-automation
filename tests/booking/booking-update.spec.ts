import { test, expect } from '@fixtures/api.fixture';
import { bookingSchema } from '@schemas/booking.schema';
import { expectStatus } from '@utils/api-assertions';
import { createBookingData } from '@utils/data-generator';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';
import { validateSchema } from '@utils/schema-validator';

test.describe('Booking Update API', () => {
  test('Should update booking successfully', { tag: ['@booking', '@regression'] }, async ({ bookingClient, bookingId, authToken }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Update Booking',
    );

    await setStory(
      'Should update booking successfully',
    );

    await severityByTag(
      ['@regression'],
    );

    const booking = createBookingData({
      firstname: 'Updated',
      lastname: 'Booking',
    });

    const response = await bookingClient.updateBookingResponse(bookingId, booking, authToken);
    expectStatus(response, 200);

    const body = await response.json();
    const updatedBooking = validateSchema(bookingSchema, body);

    expect(updatedBooking.firstname).toBe('Updated');
    expect(updatedBooking.lastname).toBe('Booking');
  });
});
