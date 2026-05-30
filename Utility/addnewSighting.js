import { pool } from '../Data/db.js'

export async function addnewSighting(data) {
    try {
        const query = `INSERT INTO spooky (location, timestamp, title, text) VALUES ($1, $2, $3, $4)`
        const values = [data.location, data.timestamp, data.title, data.text]
        await pool.query(query, values)
    }

    catch (err)
    {
        throw new Error(err)
    }
}