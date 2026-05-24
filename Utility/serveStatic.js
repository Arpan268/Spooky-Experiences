import path from 'node:path'
import fs from "node:fs/promises"
import { sendResponse } from "./sendResponse.js"
import { getContentType } from './getContentType.js'
export async function testPath(req, res, dir) {

    const publicDir = path.join(dir, 'Front-end')
    const filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url)      //absolute path
    //const pathToResource = path.join('Front-end', 'index.html')       relative path

    try {
        const content = await fs.readFile(filePath)
        const ext = path.extname(filePath)
        const contentType = getContentType(ext)
        sendResponse(res, 200, contentType, content)
    }
    catch (err) {
        if(err.code === 'ENOENT') {
            const content = await fs.readFile(path.join(dir, 'Front-end', '404.html'))
            sendResponse(res, 404, 'text/html', content)
        }
        else {
            sendResponse(res, 500, 'text/html', `<html><h1>Server Code: ${err.code}</h1></html>`)
        }
    }
}