import { DataSource } from 'typeorm';
import { Lane } from './src/lanes/entities/lane.entity';
import { Card } from './src/cards/entities/card.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  synchronize: false,
  entities: [Lane, Card],
  migrations: ['./migrations/*.ts'],
});
