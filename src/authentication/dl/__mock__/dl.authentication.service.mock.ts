import { Authentication } from '../../core/authentication';
import { UserDAO } from '../../../shared/models/users/user.dao.model';
import { LoginDTO } from '../../models/login.dto';

export class DlAuthenticationServiceMock implements Authentication<UserDAO, UserDAO> {
    login(loginModel: LoginDTO): Promise<UserDAO> {
        return Promise.resolve(undefined);
    }

    logout(token: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    signup(signUpModel: UserDAO): Promise<UserDAO> {
        return Promise.resolve(undefined);
    }

}
