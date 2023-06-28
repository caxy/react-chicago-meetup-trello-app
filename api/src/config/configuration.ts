export interface AppConfig {
  port: number;
  database: {
    port: number;
    host: any;
    username: string;
    password?: string;
    databaseName: string;
  };
  redis: {
    url: string;
  };
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    databaseName: process.env.DATABASE_NAME,
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
});
