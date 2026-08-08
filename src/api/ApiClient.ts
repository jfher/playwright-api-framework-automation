import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(endpoint);
  }

  protected async post(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.post(endpoint, {
      data,
    });
  }

  protected async put(endpoint: string, data: unknown, token?: string): Promise<APIResponse> {
    return this.request.put(endpoint, {
      data,
      headers: token
        ? {
            Cookie: `token=${token}`,
          }
        : undefined,
    });
  }

  protected async delete(endpoint: string, token: string): Promise<APIResponse> {
    return this.request.delete(endpoint, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
