import { test, expect } from '@fixtures/api.fixture';
import { credentials } from '@config/credentials';

test.describe('Authentication Negative API', () => {
    test('User should fail with invalid credentials', { tag: ["@auth", "@regression"] }, async ({ request }) => {

        const response = await request.post('/auth', {
            data:
                credentials.invalidUser
        }
        );

        const body = await response.json();
        expect(body.reason).toBe('Bad credentials');
    });
});