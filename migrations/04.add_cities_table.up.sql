CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    population INT,
    established DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);