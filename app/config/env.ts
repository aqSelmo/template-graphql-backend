interface ConfigResponse {
  port: number;
  db_dialect: 'mysql' | 'postgres';
  db_host: string;
  db_port: number;
  db_user: string;
  db_password: string;
  db_name: string;
  db_migrations_table_name: string;
}

const config = {
  test: {
    port: process.env.PORT,
  },
  development: {
    port: process.env.PORT,
    db_dialect: 'mysql',
    db_host: 'db',
    db_port: 3306,
    db_user: 'root',
    db_password: '102030',
    db_name: 'website_admin',
    db_migrations_table_name: 'migrations',
  },
  production: {
    port: process.env.PORT,
  },
};

export default config[process.env.NODE_ENV] as ConfigResponse;
