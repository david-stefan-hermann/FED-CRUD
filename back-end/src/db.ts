import pg from 'pg'
const { Pool } = pg;

export const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fed-db',
    password: 'wD8sGZR#OqVgfg^LiQ^XdTW7$skpP*Q8mzW',
    port: 5432,
});

export const queryDB = (query: string, values: any[]) => {
    try {
        db.query(query, values)
    } catch(err) {
        console.log("connection unsuccessful")
        console.log(err)
    }
}