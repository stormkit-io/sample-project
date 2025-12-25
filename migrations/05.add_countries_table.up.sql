CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(3) NOT NULL UNIQUE,
    continent VARCHAR(50) NOT NULL,
    population BIGINT,
    area_sq_km INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO countries (name, code, continent, population, area_sq_km)
VALUES 
    ('United States', 'USA', 'North America', 331900000, 9833520),
    ('Japan', 'JPN', 'Asia', 125800000, 377975),
    ('United Kingdom', 'GBR', 'Europe', 67330000, 243610),
    ('France', 'FRA', 'Europe', 67390000, 551695),
    ('Australia', 'AUS', 'Oceania', 25690000, 7692024)
ON CONFLICT DO NOTHING;
