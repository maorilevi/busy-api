import { User } from '../../shared/models/users/user.model';
import { UsersFilter } from './users.filter';

export abstract class UsersCore<USER> {
    abstract getAllUsers(): Promise<USER[]>;
    abstract getUserById(id: string): Promise<USER>;
    abstract getUsersByFilter(usersFilter: UsersFilter): Promise<USER[]>;
}
