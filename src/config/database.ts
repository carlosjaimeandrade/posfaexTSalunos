import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;

const connection: Sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: 3306,
});

export default connection;