import { ApiClient } from '../ApiClient';
import { AuthRequest, AuthResponse } from '@models/Auth';

export class AuthClient extends ApiClient {
  async login(credentials: AuthRequest): Promise<AuthResponse> {
    return this.post<AuthResponse>('/auth', credentials);
  }
}
