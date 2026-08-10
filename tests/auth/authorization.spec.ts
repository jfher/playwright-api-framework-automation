import { test } from '@fixtures/api.fixture';
import { expectStatus } from '@utils/api-assertions';
import { createBookingData } from '@utils/data-generator';

test.describe('Authorization', () => {
    test('should update booking with valid token', { tag: ['@authorization', '@smoke'] }, async ({ bookingClient, bookingId, authToken }) => {
        const booking = createBookingData();
        const response = await bookingClient.updateBookingResponse(bookingId, booking, authToken);

        expectStatus(response, 200);
    });

    test('should delete booking with valid token', { tag: ['@authorization', '@regression'] }, async ({ bookingClient, authToken }) => {
        const createResponse = await bookingClient.createBookingResponse(createBookingData());
        const created = await createResponse.json();

        const bookingId = created.bookingid;
        const response = await bookingClient.deleteBookingResponse(bookingId, authToken);

        expectStatus(response, 201);
    });

    test('should reject update without token', { tag: ['@authorization', '@regression'] }, async ({ bookingClient, bookingId }) => {
        const booking = createBookingData();
        const response = await bookingClient.updateBookingWithoutAuth(bookingId, booking);

        expectStatus(response, 403);
    });

    test('should reject delete without token', { tag: ['@authorization', '@regression'] }, async ({ bookingClient, bookingId }) => {
        const response = await bookingClient.deleteBookingWithoutAuth(bookingId);

        expectStatus(response, 403);
    });

    test('should reject update with invalid token', { tag: ['@authorization', '@regression'] }, async ({ bookingClient, bookingId }) => {
        const booking = createBookingData();
        const response = await bookingClient.updateBookingResponse(bookingId, booking, 'invalid-token');

        expectStatus(response, 403);
    });

    test('should reject delete with invalid token', { tag: ['@authorization', '@regression'] }, async ({ bookingClient, bookingId }) => {
        const response = await bookingClient.deleteBookingResponse(bookingId, 'invalid-token');

        expectStatus(response, 403);
    });
});
