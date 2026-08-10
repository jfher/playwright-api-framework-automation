import { test } from '@fixtures/api.fixture';
import { expectStatus } from '@utils/api-assertions';
import { createBookingData } from '@utils/data-generator';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';
import { invalidBookingIds } from '@utils/test-data/booking-negative-data';

test.describe('Booking Negative Tests', () => {
  for (const testCase of invalidBookingIds) {
    test(`should reject ${testCase.name}`, { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient }) => {
      await setEpic(
        'Booking',
      );

      await setFeature(
        'Get Booking Negative',
      );

      await setStory(
        'Should reject booking get with invalid id',
      );

      await severityByTag(
        ['@regression', '@negative'],
      );

      const response = await bookingClient.getBookingResponse(testCase.id);
      expectStatus(response, testCase.expectedStatus);
    });
  }

  test('should reject update without authentication', { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient, bookingId }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Update Booking',
    );

    await setStory(
      'Should reject an update without prior authentication',
    );

    await severityByTag(
      ['@regression', '@negative'],
    );

    const booking = createBookingData();
    const response = await bookingClient.updateBookingWithoutAuth(bookingId, booking);
    expectStatus(response, 403);
  });

  test('should reject delete without authentication', { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient, bookingId }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Delete Booking',
    );

    await setStory(
      'Should reject a deleted without prior authentication',
    );

    await severityByTag(
      ['@regression', '@negative'],
    );

    const response = await bookingClient.deleteBookingWithoutAuth(bookingId);
    expectStatus(response, 403);
  });

  test('should reject update with invalid token', { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient, bookingId }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Update Booking',
    );

    await setStory(
      'Should reject update with invalid token',
    );

    await severityByTag(
      ['@regression', '@negative'],
    );

    const booking = createBookingData();
    const response = await bookingClient.updateBookingResponse(bookingId, booking, 'invalid-token');
    expectStatus(response, 403);
  });

  test('should reject delete with invalid token', { tag: ['@booking', '@regression', '@negative'] }, async ({ bookingClient, bookingId }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Delete Booking',
    );

    await setStory(
      'Should reject delete with invalid token',
    );

    await severityByTag(
      ['@regression', '@negative'],
    );

    const response = await bookingClient.deleteBookingResponse(bookingId, 'invalid-token');
    expectStatus(response, 403);
  });
});
