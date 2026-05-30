import { pool } from '../Data/db.js'

export async function deleteSighting(id) {
    try {
        const response = await pool.query('DELETE FROM spooky WHERE id = $1', [id])
        return response
    } catch (error) {
        console.error('Error deleting sighting:', error)
        throw error
    }
}