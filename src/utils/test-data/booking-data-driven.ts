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

export const depositPaidCases: TestCase<Booking>[] = [
  {
    name: 'deposit paid true',
    data: {
      ...baseBooking,
      depositpaid: true,
    },
    expectedStatus: 200,
    tags: ['booking', 'regression'],
  },

  {
    name: 'deposit paid false',
    data: {
      ...baseBooking,
      depositpaid: false,
    },
    expectedStatus: 200,
    tags: ['booking', 'regression'],
  },
];

export const additionalNeedsCases: TestCase<Booking>[] = [
  {
    name: 'booking with additional needs',
    data: {
      ...baseBooking,
      additionalneeds: 'Breakfast',
    },
    expectedStatus: 200,
    tags: ['booking', 'regression'],
  },

  {
    name: 'booking without additional needs',
    data: {
      ...baseBooking,
    },
    expectedStatus: 200,
    tags: ['booking', 'regression'],
  },
];
