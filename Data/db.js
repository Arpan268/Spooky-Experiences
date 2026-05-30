import pg from 'pg';
import dotenv from 'dotenv/config';

const { Pool } = pg

export const pool = new Pool({
    connectionString: process.env.SPOOKY_DATABASE,
    max: 10,
    idleTimeoutMillis: 30000,
})