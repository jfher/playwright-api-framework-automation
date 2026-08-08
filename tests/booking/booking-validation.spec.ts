import { test, expect } from '@fixtures/api.fixture'
import { createBookingData } from '@utils/data-generator';

test.describe('Booking Validation API', () => {
  test('Should create booking with minimum valid data', { tag: ['@booking', '@validation', '@regression'] }, async ({ bookingClient }) => {
    const booking = createBookingData({
      additionalneeds: undefined,
    });

    const response = await bookingClient.createBookingResponse(booking);
    expect(response.status()).toBe(200);
  });

  test('Should preserve provided booking data', { tag: ['@booking', '@validation', '@regression'] }, async ({ bookingClient }) => {
    const booking = createBookingData({
      firstname: 'QA',
      lastname: 'Automation',
      totalprice: 999,
    });

    const response = await bookingClient.createBooking(booking);

    expect(response.booking.firstname).toBe('QA');
    expect(response.booking.lastname).toBe('Automation');
    expect(response.booking.totalprice).toBe(999);
  });
});
