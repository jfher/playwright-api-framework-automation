import { APIResponse } from '@playwright/test';
import { ApiClient } from '../ApiClient';
import { AuthRequest, AuthResponse } from '@models/Auth';

export class AuthClient extends ApiClient {
  async loginResponse(credentials: AuthRequest): Promise<APIResponse> {
    return this.post('/auth', credentials);
  }

  async login(credentials: AuthRequest): Promise<AuthResponse> {
    const response = await this.loginResponse(credentials);
    return response.json();
  }
}
