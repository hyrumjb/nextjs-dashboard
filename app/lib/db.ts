import postgres from 'postgres';

declare global {
    var cachedSql: ReturnType<typeof postgres> | undefined;
}

const sql =
    global.cachedSql ||
    postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

if (process.env.NODE_ENV !== 'production') global.cachedSql = sql;

export { sql };