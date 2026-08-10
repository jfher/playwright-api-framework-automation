import { test } from '@fixtures/api.fixture';
import { expectStatus } from '@utils/api-assertions';

import { createBookingData } from '@utils/data-generator';

test.describe('Authorization Workflow', () => {
    test('should require authentication for protected operations', { tag: ['@e2e', '@regression'] }, async ({ bookingClient, authToken }) => {
        const booking = createBookingData();
        const createResponse = await bookingClient.createBookingResponse(booking);
        expectStatus(createResponse, 200);

        const created = await createResponse.json();
        const bookingId = created.bookingid;

        try {
            await test.step('Update with valid token', async () => {
                const response = await bookingClient.updateBookingResponse(bookingId, booking, authToken);
                expectStatus(response, 200);
            });

            await test.step('Reject update without token', async () => {
                const response = await bookingClient.updateBookingWithoutAuth(bookingId, booking);
                expectStatus(response, 403);
            });

            await test.step('Reject update with invalid token', async () => {
                const response = await bookingClient.updateBookingResponse(bookingId, booking, 'invalid-token');
                expectStatus(response, 403);
            });
        } finally {
            await bookingClient.deleteBookingResponse(bookingId, authToken);
        }
    });
});
