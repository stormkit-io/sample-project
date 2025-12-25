CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    population INT,
    established DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cities (name, country, population, established)
VALUES 
    ('New York', 'United States', 8336817, '1624-07-01'),
    ('Tokyo', 'Japan', 13960000, '1603-01-01'),
    ('London', 'United Kingdom', 8982000, '0043-01-01'),
    ('Paris', 'France', 2161000, '0250-01-01'),
    ('Sydney', 'Australia', 5312000, '1788-01-26')
ON CONFLICT DO NOTHING;
