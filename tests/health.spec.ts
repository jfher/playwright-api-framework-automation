import { test, expect } from '@playwright/test';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';

test.describe('API Health', () => {
  test('API should be available', { tag: ['@smoke'] }, async ({ request }) => {
    await setEpic(
      'API Restful Booker',
    );

    await setFeature(
      'Health',
    );

    await setStory(
      'API should be available and accessible',
    );

    await severityByTag(
      ['@smoke'],
    );

    const response = await request.get(`/booking`);
    expect(response.status()).toBe(200);
  });
});
