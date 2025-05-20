import postgres from 'postgres';

type SqlClient = ReturnType<typeof postgres>;

interface CustomGlobal extends typeof globalThis {
    cachedSql?: SqlClient;
}

const globalForSql = globalThis as CustomGlobal;

const sql = globalForSql.cachedSql ?? postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

if (process.env.NODE_ENV !== 'production') {
    globalForSql.cachedSql = sql;
}

export { sql };