export function getContentType(ext) {
    const types = {
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json"
    }
    return types[ext.toLowerCase()] || "text/html"
}