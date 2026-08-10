import { test, expect } from '@fixtures/api.fixture';
import { bookingPositiveCases } from '@utils/test-data/booking-positive-data';
import { bookingResponseSchema } from '@schemas/booking.schema';
import { validateSchema } from '@utils/schema-validator';
import { expectStatus } from '@utils/api-assertions';
import { formatTags } from '@utils/test-data/test-tags';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';

test.describe('Booking Data-Driven Tests', () => {
  for (const testCase of bookingPositiveCases) {
    test(`${testCase.name} ${formatTags(testCase.tags)}`, async ({ bookingClient }) => {
      await setEpic(
        'Booking',
      );

      await setFeature(
        'Booking Data Driven Tests',
      );

      await setStory(
        `${testCase.name}`,
      );

      await severityByTag(
        [formatTags(testCase.tags)],
      );

      const response = await bookingClient.createBookingResponse(testCase.data);
      await expectStatus(response, testCase.expectedStatus);

      const body = await response.json();
      const validated = validateSchema(bookingResponseSchema, body);

      expect(validated.bookingid).toBeGreaterThan(0);
      expect(validated.booking).toMatchObject({ ...testCase.data });
    });
  }
});
