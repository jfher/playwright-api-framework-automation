import { test, expect } from '@fixtures/api.fixture';
import { createBookingData } from '@utils/data-generator';

test.describe('Booking Response Headers', () => {
  test('Response should contain JSON content type', { tag: ['@booking', '@headers', '@regression'] }, async ({ bookingClient }) => {
    const response = await bookingClient.createBookingResponse(createBookingData());

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });
});
