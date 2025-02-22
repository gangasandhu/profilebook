import dotenv from 'dotenv/config';
import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

db.connect().then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database', err);
});

db.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    bio TEXT,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(255)
    )`
);

export default db;