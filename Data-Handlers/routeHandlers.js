import { getData } from '../Utility/getData.js'
import { sendResponse } from '../Utility/sendResponse.js'
import { parseBody } from '../Utility/parseJSONBody.js'
import { addnewSighting } from '../Utility/addnewSighting.js'
import { sanitizeInput } from "../Utility/sanitizeInput.js"
import { sightingEvents } from '../Events/sightingEvents.js'
import { spookyNews } from '../Data/spookyNews.js'

export async function handleGet(res) {
    const data = await getData()
    const parsedData = JSON.stringify(data)
    sendResponse(res, 200, 'application/json', parsedData)
}

export async function handlePost(req, res) {
    const parsedcontent = await parseBody(req)
    const sanitizedContent = sanitizeInput(parsedcontent)
    await addnewSighting(sanitizedContent)
    sightingEvents.emit('sighting-added', sanitizedContent)

    try {
        sendResponse(res, 201, 'application/json', JSON.stringify(parsedcontent))
    }
    catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))
    }

}

export function handleNews(res) {
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