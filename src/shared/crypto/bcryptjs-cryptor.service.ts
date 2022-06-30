import { CryptorService } from './cryptor.service';
import * as BcryptJS from 'bcryptjs';
export class BcryptjsCryptorService implements CryptorService {
    private hashLevel = 8;
    constructor() {}

    public async encrypt(value: string): Promise<string> {
        return await BcryptJS.hash(value, this.hashLevel);
    }

    public async compare(value1: string, value2: string): Promise<boolean>{
        return await BcryptJS.compare(value1, value2);
    }
}
