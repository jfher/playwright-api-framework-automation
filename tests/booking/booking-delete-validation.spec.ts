import { test, expect } from '@fixtures/api.fixture';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';

test.describe('Booking Delete Validation', () => {
  test('Deleted booking should no longer be accessible', { tag: ['@booking', '@validation', '@regression'] }, async ({ bookingClient, bookingId, authToken }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Delete Booking Validation',
    );

    await setStory(
      'Deleted booking should no longer be accessible',
    );

    await severityByTag(
      ['@regression', '@validation'],
    );

    const deleteResponse = await bookingClient.deleteBookingResponse(bookingId, authToken);
    expect(deleteResponse.status()).toBe(201);

    const getResponse = await bookingClient.getBookingResponse(bookingId);
    expect(getResponse.status()).toBe(404);
  });
});
