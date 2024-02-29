CREATE DATABASE round_2

CREATE TABLE main_table(
    id SERIAL PRIMARY KEY,
    sno INTEGER,
    c_name VARCHAR(255),
    age INTEGER,
    phone INTEGER,
    loc TEXT,
    created_at VARCHAR(255)
);