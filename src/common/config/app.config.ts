import type { StringValue } from 'ms';

export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h' as StringValue,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
