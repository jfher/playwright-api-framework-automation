import { environment } from '@config/environment';
import { test, expect } from '@fixtures/api.fixture';

test.describe('Authentication API', () => {
    test('User should login successfully', { tag: ["@authentication", "@smoke"] }, async ({ authClient }) => {
        const response = await authClient.login({
            username: environment.username,
            password: environment.password
        });

        expect(response.token).toBeTruthy();
    });
});