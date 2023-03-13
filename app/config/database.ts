import { DataSource } from 'typeorm';
import env from '@config/env';

export const dataSource = new DataSource({
  type: env.db_dialect,
  host: env.db_host,
  port: env.db_port,
  username: env.db_name,
  password: env.db_password,
  database: env.db_name,
  migrations: [`${__dirname}/../database/migrations/*.ts`],
  migrationsTableName: env.db_migrations_table_name,
});
