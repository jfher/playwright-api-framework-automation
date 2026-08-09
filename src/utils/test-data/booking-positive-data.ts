import type { Booking } from '@models/Booking';

import type { TestCase } from './test-case';

const baseBooking: Booking = {
  firstname: 'QA',
  lastname: 'Automation',
  totalprice: 100,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-08-01',
    checkout: '2026-08-10',
  },
};

export const bookingPositiveCases: TestCase<Booking>[] = [
  {
    name: 'standard booking',
    data: baseBooking,
    expectedStatus: 200,
    tags: ['smoke', 'regression'],
  },

  {
    name: 'booking with unpaid deposit',
    data: {
      ...baseBooking,
      depositpaid: false,
    },
    expectedStatus: 200,
    tags: ['regression'],
  },

  {
    name: 'booking with additional needs',
    data: {
      ...baseBooking,
      additionalneeds: 'Breakfast',
    },
    expectedStatus: 200,
    tags: ['regression'],
  },

  {
    name: 'booking with large price',
    data: {
      ...baseBooking,
      totalprice: 999999,
    },
    expectedStatus: 200,
    tags: ['regression'],
  },
];
