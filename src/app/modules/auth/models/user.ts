import { UserRole } from "./userRole.enum";

export interface User {
  email: string;
  name: string;
  password:string;
  role: UserRole;
}
