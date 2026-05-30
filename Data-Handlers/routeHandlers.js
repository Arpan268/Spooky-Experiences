import { getData } from '../Utility/getData.js'
import { addnewSighting } from '../Utility/addnewSighting.js'
import { sanitizeInput } from "../Utility/sanitizeInput.js"
import { sightingEvents } from '../Events/sightingEvents.js'
import { spookyNews } from '../Data/spookyNews.js'
import { deleteSighting } from '../Utility/deleteSighting.js'
import { updateSighting } from '../Utility/updateSighting.js'

export async function handleGet(_req, res) {
    const data = await getData()
    try {
        res.json(data)
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to retrieve data' })
    }
}

export async function handlePost(req, res) {
    try {
        const incomingData = req.body
        const sanitizedContent = sanitizeInput(incomingData)
        await addnewSighting(sanitizedContent)
        sightingEvents.emit('sighting-added', sanitizedContent)

        res.status(201).json({ message: 'Sighting added successfully', data: sanitizedContent })
    }
    catch (err) {
        res.status(400).json({ error: err })
    }

}

export async function handleDelete(req, res) {
    const id = req.params.id
    await deleteSighting(id)
    try {
        res.status(200).json({ message: 'Sighting deleted successfully' })
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete sighting' })
    }
}

export async function handleUpdate(req, res) {
    const id = req.params.id
    const txt = req.body.text
    await updateSighting(id, txt)
    try {
        res.status(200).json({ message: 'Sighting updated successfully' })
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update sighting' })
    }
}

export function handleNews(_req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * spookyNews.length)
        const randomNews = spookyNews[randomIndex]

        res.write(`data: ${JSON.stringify({ news: randomNews })}\n\n`)
    }, 4000)
}