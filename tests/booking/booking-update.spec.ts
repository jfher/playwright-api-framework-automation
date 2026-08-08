import { test, expect } from '@fixtures/api.fixture';
import { createBookingData } from '@utils/data-generator';

test.describe('Booking Update API', () => {
    test('Should update booking successfully', { tag: ['@booking', "@regression"] }, async ({ bookingClient, bookingId, authToken }) => {
        const booking = createBookingData();
        const response = await bookingClient.updateBooking(bookingId, booking, authToken);

        expect(response.firstname).toBe(booking.firstname);
    });
});