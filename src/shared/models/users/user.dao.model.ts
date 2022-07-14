export class UserDAO {
    id?: string;
    password?: string;
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
    constructor(id?: string, avatar?: string, email?: string, firstName?: string, lastName?: string) {
        this.id = id ? id : '';
        this.avatar = avatar ? avatar : '';
        this.email = email ? email : '';
        this.first_name = firstName ? firstName : '';
        this.last_name = lastName ? lastName : '';
    }
}

