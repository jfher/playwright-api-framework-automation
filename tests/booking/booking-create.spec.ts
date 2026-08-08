import { test, expect } from '@fixtures/api.fixture';
import { createBookingData } from '@utils/data-generator';

test.describe('Booking Create API', () => {
    test('Should create a booking successfully', { tag: ['@booking', "@smoke"] }, async ({ bookingClient }) => {
        const booking = createBookingData();
        const response = await bookingClient.createBooking(booking);

        expect(response.bookingid).toBeGreaterThan(0);
        expect(response.booking.firstname).toBe(booking.firstname);
    });
});