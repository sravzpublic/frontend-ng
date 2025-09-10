import { ExternalLogin } from '../models/login';

export interface AuthProvider {
  config();
  login(configId);
  getUserInfo(): Promise<ExternalLogin>;
  logout(configId);
}
