import { Sequelize } from "sequelize";
import Transfer from './models/Transfer';
import dotenv from 'dotenv';

dotenv.config()

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'postgres',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || '1111',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.PORT_DB) || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.POSTGRES_DB ? {
        require: false,
        rejectUnauthorized: false
      } : null
    },
    query: {
      raw: true
    },
    define: {
      freezeTableName: true
    },
    pool: {
      max: 20,
      min: 0,
      acquire: 180000,
      idle: 10000
    }
  }
)

export const models = {
    Transfer: Transfer(sequelize)
}