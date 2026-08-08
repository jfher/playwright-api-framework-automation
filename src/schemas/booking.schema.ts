import { z } from 'zod';

export const bookingDatesSchema = z.object({
  checkin: z.string(),
  checkout: z.string(),
});

export const bookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: bookingDatesSchema,
  additionalneeds: z.string().optional(),
});

export const bookingResponseSchema = z.object({
  bookingid: z.number(),
  booking: bookingSchema,
});

export const bookingIdsSchema = z.array(
  z.object({
    bookingid: z.number(),
  }),
);
