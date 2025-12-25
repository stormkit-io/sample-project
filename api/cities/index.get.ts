import db from "../_lib/db";

// Using object-return syntax
export default async () => {
  console.log("Received request to fetch cities...");

  const client = await db();

  let cities;

  try {
    const result = await client.query(`
        SELECT id, name, country, population, established
        FROM cities
        ORDER BY created_at DESC
    `);

    cities = result.rows;
  } catch (error) {
    console.error("Error fetching cities:", error);

    return {
      body: "Error fetching cities",
      status: 500,
    };
  }

  console.log(`Fetched ${cities.length} cities.`);

  return {
    body: JSON.stringify(cities),
    headers: {
      "Content-Type": "application/json",
      "X-Custom-Header": "Sample Project",
    },
    status: 200,
  };
};
