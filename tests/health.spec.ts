import { test, expect } from '@playwright/test';

test.describe('API Health', () => {
    test('API should be available', { tag: ["@smoke"] }, async ({ request }) => {
        const response = await request.get(`/booking`);
        expect(response.status()).toBe(200);
    });


});