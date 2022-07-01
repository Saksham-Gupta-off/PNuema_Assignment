CREATE DATABASE userdata;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name TEXT,
    age INT,
    email TEXT,
    mobile BIGINT
);