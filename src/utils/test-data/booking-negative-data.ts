export interface InvalidBookingIdCase {
  name: string;
  id: number;
  expectedStatus: number;
}

export const invalidBookingIds: InvalidBookingIdCase[] = [
  {
    name: 'non-existing booking id',
    id: 999999999,
    expectedStatus: 404,
  },

  {
    name: 'zero booking id',
    id: 0,
    expectedStatus: 404,
  },

  {
    name: 'negative booking id',
    id: -1,
    expectedStatus: 404,
  },
];
