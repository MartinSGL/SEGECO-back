import { Roles } from './rolesInterface';

export interface JwtPayload {
  fullname: string;
  user: string;
  role: Roles;
}