import express from "express"
import { handleGet, handlePost, handleNews, handleDelete, handleUpdate } from "./Data-Handlers/routeHandlers.js"

const app = express()

app.use(express.static('Front-end'))
app.use(express.json())

app.get('/api', handleGet)
app.post('/api', handlePost)
app.get('/api/news', handleNews)
app.delete('/api/:id', handleDelete)
app.put('/api/:id', handleUpdate)

app.listen(8000, () => console.log(`Server running on http://localhost:8000`))