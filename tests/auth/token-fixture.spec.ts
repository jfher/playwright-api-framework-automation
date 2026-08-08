import { test, expect } from '@fixtures/api.fixture';

test('Token should be generated automatically', { tag: ['@authentication', '@regression'] }, async ({ authToken }) => {
  expect(authToken).toBeTruthy();
});
