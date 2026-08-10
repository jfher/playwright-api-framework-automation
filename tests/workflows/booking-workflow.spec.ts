import { test, expect } from '@fixtures/api.fixture';
import { bookingResponseSchema } from '@schemas/booking.schema';
import { expectStatus } from '@utils/api-assertions';
import { createBookingData } from '@utils/data-generator';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';
import { validateSchema } from '@utils/schema-validator';

test.describe('Booking API Workflow', () => {
  test('should complete booking lifecycle', { tag: ['@e2e', '@booking', '@regression'] }, async ({ bookingClient, authToken }) => {
    await setEpic(
      'Booking',
    );

    await setFeature(
      'Booking Lifecycle',
    );

    await setStory(
      'Complete booking workflow',
    );

    await severityByTag(
      ['@e2e']
    );

    const booking = createBookingData();
    let bookingId: number | undefined;
    let bookingDeleted = false;

    try {
      await test.step('Create booking', async () => {
        const response = await bookingClient.createBookingResponse(booking);
        expectStatus(response, 200);

        const body = await response.json();
        const validated = validateSchema(bookingResponseSchema, body);

        bookingId = validated.bookingid;
        expect(bookingId).toBeGreaterThan(0);
      });

      await test.step('Get booking', async () => {
        const response = await bookingClient.getBookingResponse(bookingId!);
        expectStatus(response, 200);

        const body = await response.json();
        expect(body).toMatchObject({ ...booking });
      });

      const updatedBooking = createBookingData({
        firstname: 'Updated',
        lastname: 'Booking',
        totalprice: 500,
      });

      await test.step('Update booking', async () => {
        const response = await bookingClient.updateBookingResponse(bookingId!, updatedBooking, authToken);
        expectStatus(response, 200);
      });

      await test.step('Verify updated booking', async () => {
        const response = await bookingClient.getBookingResponse(bookingId!);
        expectStatus(response, 200);

        const body = await response.json();
        expect(body).toMatchObject({ ...updatedBooking });
      });

      await test.step('Delete booking', async () => {
        const response = await bookingClient.deleteBookingResponse(bookingId!, authToken);
        expectStatus(response, 201);
      });

      await test.step('Verify booking deletion', async () => {
        const response = await bookingClient.getBookingResponse(bookingId!);
        expectStatus(response, 404);
      });

      bookingDeleted = true;
    } finally {
      if (bookingId && !bookingDeleted) {
        await bookingClient.deleteBookingResponse(bookingId, authToken);
      }
    }
  });
});
