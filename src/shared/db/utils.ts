// import { createPool, Pool} from 'mysql';
// import { DATA_SOURCES } from '../../config/vars.config';
//
// let pool: Pool;
// /**
//  * generates pool connection to be used throughout the app
//  */
// export const init = () => {
//     const mySqlDataSource = {
//         DB_HOST: process.env.MY_SQL_DB_HOST,
//         DB_USER: process.env.MY_SQL_DB_USER,
//         DB_PASSWORD: process.env.MY_SQL_DB_PASSWORD,
//         DB_PORT: process.env.MY_SQL_DB_PORT,
//         DB_DATABASE: process.env.MY_SQL_DB_DATABASE,
//         DB_CONNECTION_LIMIT: process.env.MY_SQL_DB_CONNECTION_LIMIT ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT) : 4,
//     }
//     try {
//         console.log(mySqlDataSource)
//         pool = createPool({
//             connectionLimit: mySqlDataSource.DB_CONNECTION_LIMIT,
//             host: mySqlDataSource.DB_HOST,
//             user: mySqlDataSource.DB_USER,
//             password: mySqlDataSource.DB_PASSWORD,
//             database: mySqlDataSource.DB_DATABASE,
//         });
//
//         console.debug('MySql Adapter Pool generated successfully',pool);
//     } catch (error) {
//         console.error('[mysql.connector][init][Error]: ', error);
//         throw new Error('failed to initialized pool');
//     }
// };
//
// /**
//  * executes SQL queries in MySQL db
//  *
//  * @param {string} query - provide a valid SQL query
//  * @param {string[] | Object} params - provide the parameterized values used
//  * in the query
//  */
// export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
//     try {
//         if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
//
//         return new Promise<T>((resolve, reject) => {
//             pool.query(query, params, (error, results) => {
//                 if (error) reject(error);
//                 else resolve(results);
//             });
//         });
//
//     } catch (error) {
//         console.error('[mysql.connector][execute][Error]: ', error);
//         throw new Error('failed to execute MySQL query');
//     }
// }

import * as mysql from 'mysql';

export const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "maor",
    password: "BarMaor1990$",
    database: "bussy"
});

connection.connect((err) => {
    if (err) {
        console.log("Error occurred", err);
    } else {
        console.log("Connected to MySQL Server");
    }
});
