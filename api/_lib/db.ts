import pg from "pg";

// Connect to database using `POSTGRES_*` environment variables
const client = new pg.Client({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

let connected = false;

async function ensureConnected() {
  if (!connected) {
    connected = true;

    try {
      console.log("Connecting to the database...");
      await client.connect();

      console.log("Connected to the database.");
      await client.query(
        "SET search_path TO " + process.env.POSTGRES_SCHEMA + ";"
      );
    } catch (error) {
      connected = false;
      console.error("Failed to connect to the database:", error);
      return Promise.reject(error);
    }
  }

  return Promise.resolve();
}

export default async function getDB() {
  await ensureConnected();
  return client;
}
