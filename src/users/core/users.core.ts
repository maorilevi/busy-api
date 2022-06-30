import { User } from '../../shared/models/users/user.model';
import { UsersFilter } from './users.filter';

export abstract class UsersCore {
    abstract getAllUsers(): Promise<User[]>;
    abstract getUserById(id: string): Promise<User>;
    abstract getUsersByFilter(usersFilter: UsersFilter): Promise<User[]>;
}
