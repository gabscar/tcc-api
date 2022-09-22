import { Sequelize } from 'sequelize';
import Logger from '../api/lib/logger';

function customLog(msg: string) {
  Logger.debug(msg);
}

export const db: Sequelize =
  process.env.NODE_ENV !== 'test'
    ? new Sequelize({
        host: <string>process.env.DB_HOST,
        database: <string>process.env.DB_NAME,
        username: <string>process.env.DB_USER,
        password: <string>process.env.DB_PASS,
        port: parseInt(<string>process.env.DB_PORT, 10) || 5432,
        dialect: 'postgres',
        logging: <string>process.env.DB_LOG === 'true' ? customLog : false,
        timezone: 'Asia/Jakarta'
      })
    : new Sequelize({
        host: <string>process.env.DB_HOST_TEST,
        database: <string>process.env.DB_NAME_TEST,
        username: <string>process.env.DB_USER_TEST,
        password: <string>process.env.DB_PASS_TEST,
        port: parseInt(<string>process.env.DB_PORT_TEST, 10) || 5432,
        dialect: 'postgres',
        logging: <string>process.env.DB_LOG_TEST === 'true' ? customLog : false,
        timezone: 'Asia/Jakarta'
      });

export default async function syncDB(): Promise<Sequelize> {
  return await db.sync();
}
