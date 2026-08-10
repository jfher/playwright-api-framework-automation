import { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { logApiInteraction } from '@utils/api-logger';
import { addAttachment } from '@utils/reporting/allure';

export class ApiClient {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly testInfo: TestInfo,
  ) { }

  protected async get(endpoint: string): Promise<APIResponse> {
    const start = Date.now();
    const response = await this.request.get(endpoint);

    await this.logResponse('GET', endpoint, response, start);
    await this.logResponseAllure(response);

    return response;
  }

  protected async post(endpoint: string, data: unknown): Promise<APIResponse> {
    const start = Date.now();

    const response = await this.request.post(endpoint, {
      data,
    });

    // await this.logResponse('POST', endpoint, response, start, data);
    await this.logResponseAllure(response);

    return response;
  }

  protected async put(endpoint: string, data: unknown, token?: string): Promise<APIResponse> {
    const start = Date.now();

    const response = await this.request.put(endpoint, {
      data,
      headers: token
        ? {
          Cookie: `token=${token}`,
        }
        : undefined,
    });

    // await this.logResponse('PUT', endpoint, response, start, data);
    await this.logResponseAllure(response);

    return response;
  }

  protected async delete(endpoint: string, token?: string): Promise<APIResponse> {
    const start = Date.now();

    const response = await this.request.delete(endpoint, {
      headers: token
        ? {
          Cookie: `token=${token}`,
        }
        : undefined,
    });

    // await this.logResponse('DELETE', endpoint, response, start);
    await this.logResponseAllure(response);

    return response;
  }

  private async logResponse(method: string, endpoint: string, response: APIResponse, start: number, requestBody?: unknown): Promise<void> {
    let responseBody: unknown;
    try {
      responseBody = await response.json();
    } catch {
      responseBody = await response.text();
    }

    await logApiInteraction(this.testInfo, {
      method,
      url: endpoint,
      status: response.status(),
      duration: Date.now() - start,
      requestBody,
      responseBody,
    });
  }

  // ALLURE //

  protected async logRequest(method: string, url: string, data?: unknown): Promise<void> {
    await addAttachment('API Request', {
      method,
      url,
      body: data,
    });
  }

  protected async logResponseAllure(response: APIResponse): Promise<void> {
    let body;

    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }

    await addAttachment('API Response', {
      status: response.status(),
      headers: response.headers(),
      body,
    });
  }
}
