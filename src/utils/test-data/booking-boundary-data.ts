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

export const bookingPriceBoundaryCases: TestCase<Booking>[] = [
  {
    name: 'minimum representative price',
    data: {
      ...baseBooking,
      totalprice: 0,
    },
    expectedStatus: 200,
    tags: ['regression'],
  },

  {
    name: 'normal positive price',
    data: {
      ...baseBooking,
      totalprice: 1,
    },
    expectedStatus: 200,
    tags: ['regression'],
  },

  {
    name: 'large positive price',
    data: {
      ...baseBooking,
      totalprice: 999999,
    },
    expectedStatus: 200,
    tags: ['regression'],
  },
];
