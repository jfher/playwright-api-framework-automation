import { test } from '@fixtures/api.fixture';
import { expectStatus } from '@utils/api-assertions';
import { createBookingData } from '@utils/data-generator';
import { invalidBookingIds } from '@utils/test-data/booking-negative-data';

test.describe('Booking Negative Tests', () => {
  for (const testCase of invalidBookingIds) {
    test(`should reject ${testCase.name}`, { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient }) => {
      const response = await bookingClient.getBookingResponse(testCase.id);
      // expect(response.status()).toBe(testCase.expectedStatus);
      expectStatus(response, testCase.expectedStatus);
    });
  }

  test('should reject update without authentication', { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient, bookingId }) => {
    const booking = createBookingData();
    const response = await bookingClient.updateBookingWithoutAuth(bookingId, booking);
    // expect(response.status()).toBe(403);
    expectStatus(response, 403);
  });

  test('should reject delete without authentication', { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient, bookingId }) => {
    const response = await bookingClient.deleteBookingWithoutAuth(bookingId);
    expectStatus(response, 403);
  });

  test('should reject update with invalid token', { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient, bookingId }) => {
    const booking = createBookingData();
    const response = await bookingClient.updateBookingResponse(bookingId, booking, 'invalid-token');
    expectStatus(response, 403);
  });

  test('should reject delete with invalid token', { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient, bookingId }) => {
    const response = await bookingClient.deleteBookingResponse(bookingId, 'invalid-token');
    expectStatus(response, 403);
  });
});
