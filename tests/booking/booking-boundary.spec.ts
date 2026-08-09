import { test, expect } from '@fixtures/api.fixture';
import { bookingPriceBoundaryCases } from '@utils/test-data/booking-boundary-data';
import { bookingResponseSchema } from '@schemas/booking.schema';
import { validateSchema } from '@utils/schema-validator';

test.describe('Booking Boundary Tests', () => {
    for (const testCase of bookingPriceBoundaryCases) {
        test(`${testCase.name}`, { tag: ['@booking', '@regression'] }, async ({ bookingClient }) => {
            const response = await bookingClient.createBookingResponse(testCase.data);
            expect(response.status()).toBe(testCase.expectedStatus);

            const body = await response.json();
            const validated = validateSchema(bookingResponseSchema, body);

            expect(validated.booking.totalprice).toBe(testCase.data.totalprice);
        });
    }
});
