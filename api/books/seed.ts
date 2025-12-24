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
      await client.connect();
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

// Using object-return syntax
export default async () => {
  console.log("Received request...");
  console.log("Connecting to the database...");
  await ensureConnected();

  console.log("Connected to the database.");
  console.log("Seeding sample books...");

  // Insert 3 sample books
  await client.query(`
    INSERT INTO books (title, author, published_date, isbn, pages)
    VALUES 
      ('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', '978-0-7432-7356-5', 180),
      ('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', '978-0-06-112008-4', 324),
      ('1984', 'George Orwell', '1949-06-08', '978-0-452-28423-4', 328)
    ON CONFLICT (isbn) DO NOTHING
  `);

  console.log("Seeding completed.");
  console.log("Closing database connection...");

  await client.end();

  console.log("Database connection closed.");

  return {
    body: "3 books seeded successfully",
    headers: {
      "X-Custom-Header": "Sample Project",
    },
    status: 200,
  };
};
