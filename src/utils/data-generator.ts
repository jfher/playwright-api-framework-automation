import { Booking } from '@models/Booking';

export interface BookingOverrides {
  firstname?: string;
  lastname?: string;
  totalprice?: number;
  depositpaid?: boolean;
  checkin?: string;
  checkout?: string;
  additionalneeds?: string;
}

export function createBookingData(overrides: BookingOverrides = {}): Booking {
  const timestamp = Date.now();

  return {
    firstname: overrides.firstname ?? `User${timestamp}`,
    lastname: overrides.lastname ?? 'Automation',
    totalprice: overrides.totalprice ?? 100,
    depositpaid: overrides.depositpaid ?? true,

    bookingdates: {
      checkin: overrides.checkin ?? '2026-08-01',
      checkout: overrides.checkout ?? '2026-08-10',
    },

    additionalneeds: overrides.additionalneeds ?? 'Breakfast',
  };
}
