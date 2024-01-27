import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'mongodb',
  ssl: false,
  host: process.env.DATABASE_MONGO_HOST,
  port: process.env.DATABASE_MONGO_PORT as number | undefined,
  username: process.env.DATABASE_MONGO_USER,
  password: process.env.DATABASE_MONGO_PASSWORD,
  database: process.env.DATABASE_MONGO_NAME,
  synchronize: true,
  entities: [`${__dirname}/models/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`]
})