import { UserRoles } from "../constants/user-roles.enum";

export interface User {
  email: string;
  name: string;
  password:string;
  role: UserRoles;
}
