import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from './Utility/getData.js'

export async function addnewSighting(data) {
    try {
        const sightings = getData()
        sightings.push(data)
        const pathdata = path.join('Data', 'data.json')
        await fs.writeFile(pathdata, JSON.stringify(sightings, null, 2), 'utf8')
    }

    catch (err)
    {
        throw new Error(err)
    }
}