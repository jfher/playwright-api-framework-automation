import { test, expect } from '@fixtures/api.fixture';
import { createBookingData } from '@utils/data-generator';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';

test.describe('Booking Response Headers', () => {
  test('Response should contain JSON content type', { tag: ['@booking', '@headers', '@regression'] }, async ({ bookingClient }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Response Headers',
    );

    await setStory(
      'Response should contain JSON content type',
    );

    await severityByTag(
      ['@regression', '@headers'],
    );

    const response = await bookingClient.createBookingResponse(createBookingData());

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });
});
