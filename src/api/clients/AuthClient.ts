import { APIRequestContext, APIResponse, TestInfo } from '@playwright/test';
import { ApiClient } from '../ApiClient';
import { AuthRequest, AuthResponse } from '@models/Auth';

export class AuthClient extends ApiClient {
  constructor(request: APIRequestContext, testInfo: TestInfo) {
    super(request, testInfo);
  }

  async loginResponse(credentials: Partial<AuthRequest>): Promise<APIResponse> {
    return this.post('/auth', credentials);
  }

  async login(credentials: AuthRequest): Promise<AuthResponse> {
    const response = await this.loginResponse(credentials);
    return response.json();
  }
}
