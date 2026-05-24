export async function parseBody(req) {

    let body = ''
    for await (const chunk of req) {
        body += chunk
    }

    try {
        const content = JSON.parse(body)
        return content
    }

    catch (err) {
        console.log(`Invalid JSON format: ${err}`)
    }
}