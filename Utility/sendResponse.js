export function sendResponse(res, statusCode, contentType, payload) {
    
    res.statusCode = statusCode
    res.setHeader('Content-Type', contentType)          //res.writeHead(200, {'Content-Type': 'text/html'})     [Recommended not to use this as it has many potential drawbacks]
    res.end(payload)
}