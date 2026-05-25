import { getData } from '../Utility/getData.js'
import { sendResponse } from '../Utility/sendResponse.js'
import { parseBody } from '../Utility/parseJSONBody.js'
import { addnewSighting } from '../Utility/addnewSighting.js'
import { sanitizeInput } from "../Utility/sanitizeInput.js"
import { sightingEvents } from '../Events/sightingEvents.js'

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