import { Booking } from '@models/Booking';

export function createBookingData(): Booking {
    return {
        firstname: `User${Date.now()}`,
        lastname: 'Automation',
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-08-01',
            checkout: '2026-08-10'
        },
        additionalneeds: 'Breakfast'
    };
}