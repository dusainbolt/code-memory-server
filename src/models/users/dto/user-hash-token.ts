import { Role } from './user-enum';

export class UserHashToken {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  roles: Role[];
}
