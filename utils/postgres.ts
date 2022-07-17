import * as postgres from "postgres";
import { config } from "dotenv";

// Create a database pool with three connections that are lazily established
const pool = new postgres.Pool(
  {
    user: "postgres",
    database: "db",
    password: config().PG_PASSWORD,
    port: 5632,
    hostname: "localhost",
  },
  3,
  true
);

// Connect to the database
export async function connect(): Promise<postgres.PoolClient> {
  return await pool.connect();
}

export async function init(): Promise<void> {
  const connection = await connect();
  try {
    // Create the table
    await connection.queryObject`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL
    )
  `;
  } finally {
    // Release the connection back into the pool
    connection.release();
  }
}
