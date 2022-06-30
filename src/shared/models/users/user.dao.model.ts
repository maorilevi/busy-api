import { User } from './user.model';

export class UserDAO implements User {
    id?: string;
    password?: string;
    avatar: string;
    email: string;
    firstName: string;
    lastName: string;
    constructor(id?: string, avatar?: string, email?: string, firstName?: string, lastName?: string) {
        this.id = id ? id : '';
        this.avatar = avatar ? avatar : '';
        this.email = email ? email : '';
        this.firstName = firstName ? firstName : '';
        this.lastName = lastName ? lastName : '';
    }
}

