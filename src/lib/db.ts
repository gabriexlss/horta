import { Pool } from 'pg';

const globalForDb = globalThis as unknown as {
    pool: Pool | undefined;
};

export const pool =
    globalForDb.pool ??
    new Pool({
        connectionString: process.env['DATABASE_URL'],
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 20000,
    });

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;
