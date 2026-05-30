import { pool } from '../Data/db.js'
export async function getData() {

    try{
        const result = await pool.query('SELECT * FROM spooky')
        return result.rows
    }
    catch(err)
    {
        console.log(err)
        return []
    }
}