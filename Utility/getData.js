import path from 'node:path'
import fs from 'node:fs/promises'
export async function getData() {

    try{
        const pathdata = path.join('Data', 'data.json')
        const data = await fs.readFile(pathdata, 'utf8')    //utf8 converts json data to string
        const parseddata = JSON.parse(data)     //the string is converted to an array of objects for further use like adding more spooky experiences
        return parseddata
    }
    catch(err)
    {
        console.log(err)
        return []
    }
}