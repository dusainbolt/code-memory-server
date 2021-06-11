import { Role } from "../users.schema";

export class UserHashToken {
    _id: string;

    fullName: string;

    userName: string;

    email: string;

    roles: Role[];
}
