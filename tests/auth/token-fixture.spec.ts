import { test, expect } from '@fixtures/api.fixture';
import { setEpic, setFeature, setStory } from '@utils/reporting/allure';
import { severityByTag } from '@utils/reporting/test-metadata';

test('Token should be generated automatically', { tag: ['@authentication', '@regression'] }, async ({ authToken }) => {
  await setEpic(
    'Authentication',
  );

  await setFeature(
    'Generate Token',
  );

  await setStory(
    'Token should be generated automatically',
  );

  await severityByTag(
    ['@regression'],
  );
  expect(authToken).toBeTruthy();
});
