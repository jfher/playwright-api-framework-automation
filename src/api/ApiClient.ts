import { APIRequestContext } from '@playwright/test';

export class ApiClient {

    constructor(
        protected readonly request: APIRequestContext
    ) { }

    protected async get<T>(endpoint: string): Promise<T> {
        const response = await this.request.get(endpoint);

        if (!response.ok()) {
            throw new Error(
                `GET ${endpoint} failed: ${response.status()}`
            );
        }
        return response.json();
    }

    protected async post<T>(endpoint: string, data: unknown): Promise<T> {

        const response = await this.request.post(endpoint,
            {
                data
            }
        );

        if (!response.ok()) {
            throw new Error(
                `POST ${endpoint} failed: ${response.status()}`
            );
        }
        return response.json();
    }

    protected async put<T>(endpoint: string, data: unknown, token?: string): Promise<T> {
        const response = await this.request.put(endpoint, {
            data,
            headers: {
                Cookie: token ? `token=${token}` : ''
            }
        }
        );

        if (!response.ok()) {
            throw new Error(
                `PUT ${endpoint} failed: ${response.status()}`
            );
        }
        return response.json();
    }

    protected async delete(endpoint: string, token: string) {

        const response = await this.request.delete(endpoint, {
            headers: {
                Cookie: `token=${token}`
            }
        }
        );

        if (!response.ok()) {
            throw new Error(
                `DELETE ${endpoint} failed: ${response.status()}`
            );
        }
        return response;
    }
}