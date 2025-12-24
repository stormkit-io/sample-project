import db from "../_lib/db";

// Using object-return syntax
export default async () => {
  console.log("Received request to fetch books...");

  const client = await db();

  let books;

  try {
    const result = await client.query(`
        SELECT id, title, author, published_date, isbn, pages
        FROM books
        ORDER BY created_at DESC
    `);

    books = result.rows;
  } catch (error) {
    console.error("Error fetching books:", error);

    return {
      body: "Error fetching books",
      status: 500,
    };
  }

  console.log(`Fetched ${books.length} books.`);

  return {
    body: JSON.stringify(books),
    headers: {
      "Content-Type": "application/json",
      "X-Custom-Header": "Sample Project",
    },
    status: 200,
  };
};
