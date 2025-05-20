/* eslint-disable no-var */

import postgres from 'postgres';

type SqlClient = ReturnType<typeof postgres>;

declare global {
    var cachedSql: SqlClient | undefined;
}
/* eslint-enable no-var */

const sql = global.cachedSql ?? postgres(process.env.POSTGRES_URL!, {
    ssl: 'require',
});

if (process.env.NODE_ENV !== 'production') {
    global.cachedSql = sql;
}

export { sql };