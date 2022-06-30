import { CryptorService } from '../cryptor.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoServiceMock implements CryptorService {
    compare(value1: string, value2: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    encrypt(value: string): Promise<string> {
        return Promise.resolve('');
    }

}
