export type UserRole = 'customer' | 'center' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  token?: string;
}
