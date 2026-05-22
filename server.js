import http from "node:http"
import { testPath } from "./Utility/serveStatic.js"

const dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    await testPath(req, res, dirname)
})

server.listen(8000, () => console.log(`Server running on http://localhost:8000`))