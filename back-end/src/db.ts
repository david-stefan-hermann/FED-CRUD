// Import the "pg" module to use PostgreSQL in the application
import pg from "pg"
// Destructure the Pool class from the pg module for creating a pool of connections
const { Pool } = pg

// Export a new instance of Pool, configured to connect to a specific PostgreSQL database
export const db = new Pool({
    user: "postgres", // Username to connect to the database
    host: "localhost", // Host where the database is located
    database: "fed-db", // Name of the database to connect to
    password: "wD8sGZR#OqVgfg^LiQ^XdTW7$skpP*Q8mzW", // Password for the database user
    port: 5432, // Port number where the database server is listening
})

// Export a function for executing queries against the database
export const queryDB = (query: string, values: any[]) => {
    try {
        // Attempt to execute a query with the given string and values
        db.query(query, values)
    } catch(err) {
        // Log a message and the error if the connection or query execution fails
        console.log("connection unsuccessful")
        console.log(err)
    }
}
