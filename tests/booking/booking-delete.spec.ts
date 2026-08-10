import { test, expect } from '@fixtures/api.fixture';
import { createBookingData } from '@utils/data-generator';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';

test.describe('Booking Delete API', () => {
  test('Should delete booking successfully', { tag: ['@booking', '@regression'] }, async ({ bookingClient, authToken }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Delete Booking',
    );

    await setStory(
      'Should delete an existing booking',
    );

    await severityByTag(
      ['@regression'],
    );
    const booking = await bookingClient.createBooking(createBookingData());
    const response = await bookingClient.deleteBookingResponse(booking.bookingid, authToken);

    expect(response.status()).toBe(201);
  });
});
