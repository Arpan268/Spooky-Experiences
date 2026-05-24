import http from "node:http"
import { testPath } from "./Utility/serveStatic.js"
import { handleGet, handlePost } from "./Data-Handlers/routeHandlers.js"

const dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

    if (req.url === '/api') {
        if (req.method === 'GET') {
            return await handleGet(res)
        }
        else if (req.method === 'POST') {
            return await handlePost(req, res)
        }
    }
    else if (!req.url.startsWith('/api')) {
        await testPath(req, res, dirname)
    }
})

server.listen(8000, () => console.log(`Server running on http://localhost:8000`))