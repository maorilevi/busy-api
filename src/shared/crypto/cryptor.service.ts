export interface CryptorService {
    encrypt(value: string): Promise<string>;
    compare(value1: string, value2: string): Promise<boolean>;
}
