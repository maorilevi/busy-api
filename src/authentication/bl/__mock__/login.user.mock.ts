import { UserDTO } from '../../../shared/models/users/user.dto.model';
import { UserDAO } from '../../../shared/models/users/user.dao.model';

export class JohnS1LoginUserMockDTO extends UserDTO {
    constructor() {
        super('1', 'http://mock-avatar.com', 'johns1@gmail.com', 'John1', 'Smith');
    }
}

export class JohnS1LoginUserMockDAO extends UserDAO {
    constructor() {
        super('1', 'http://mock-avatar.com', 'johns1@gmail.com', 'John1', 'Smith');
    }

}
