import { pool } from '../Data/db.js'

export async function updateSighting (id, data) {
    try {
        const query = `UPDATE spooky SET text = $1 WHERE id = $2`
        const response = await pool.query(query, [data, id])
        return response
    }
    catch (err)
    {
        console.log(err)
        throw new Error(err)
    }
    
}