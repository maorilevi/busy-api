import { Injectable } from '@nestjs/common';
import { Connection, MysqlError } from 'mysql';
import * as mysql from 'mysql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
    private _connection: Connection;
    private readonly host: string;
    private readonly user: string;
    private readonly password: string;
    private readonly database: string;

    constructor(private configService: ConfigService) {
        this.host = this.configService.get<string>('MY_SQL_DB_HOST');
        this.user = this.configService.get<string>('MY_SQL_DB_USER');
        this.password = this.configService.get<string>('MY_SQL_DB_PASSWORD');
        this.database = this.configService.get<string>('MY_SQL_DB_DATABASE');
        this.init();
    }
    public init(): void {
        this._connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
        this._connection.connect((err) => {
            if (err) {
                console.log("Error occurred", err);
            } else {
                console.log("Connected to MySQL Server");
            }
        });
    }
    public get connection(): Connection {
        return this._connection;
    }
    public async query(query: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (error: MysqlError, response: any) => {
                if (error) {
                    console.log(query);
                    reject(error);
                } else {
                    resolve(response[0]);
                }
            })
        })
    }
}
