CREATE TABLE users (
    id serial NOT NULL PRIMARY KEY,
    password CHAR(60),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(60),
    created_date timestamp ,
    birth_date timestamp
);
