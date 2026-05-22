import path from 'node:path'
import fs from "node:fs/promises"
import { sendResponse } from "./sendResponse.js"
export async function testPath(req, res, dir) {

    const filePath = path.join(dir, 'Front-end', 'index.html')      //absolute path
    //const pathToResource = path.join('Front-end', 'index.html')       relative path

    try {
        const content = await fs.readFile(filePath)
        sendResponse(res, 200, 'text/html', content)
    }
    catch (err) {
        console.log(err)
    }
}