import db from "../_lib/db";

// Using object-return syntax
export default async () => {
  console.log("Received request...");

  const client = await db();

  console.log("Seeding sample books...");

  // Insert 3 sample books
  try {
    await client.query(`
        INSERT INTO books (title, author, published_date, isbn, pages)
        VALUES 
            ('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', '978-0-7432-7356-5', 180),
            ('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', '978-0-06-112008-4', 324),
            ('1984', 'George Orwell', '1949-06-08', '978-0-452-28423-4', 328)
        ON CONFLICT (isbn) DO NOTHING
    `);
  } catch (error) {
    console.error("Error seeding books:", error);

    return {
      body: "Error seeding books",
      status: 500,
    };
  }

  console.log("Seeding completed.");

  return {
    body: "3 books seeded successfully",
    headers: {
      "X-Custom-Header": "Sample Project",
    },
    status: 200,
  };
};
