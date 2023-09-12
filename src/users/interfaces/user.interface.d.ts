import { Roles } from './rolesInterface';

export interface UserInformation {
  id: ObjectId;
  user: string;
  fullname: string;
  role: Roles;
}