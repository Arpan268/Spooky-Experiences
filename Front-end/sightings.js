const response = await fetch('/api')
const sightings = await response.json()

const cardcontainer = document.querySelector('#card-container')
const loadMore = document.querySelector('#load-more')

let card = ''
let currentIndex = 0
const batchSize = 3

function renderCards() {
    const currentBatch = sightings.slice(currentIndex, currentIndex + batchSize)

    currentBatch.forEach((data) => {
        const dateObj = new Date(data.timestamp)
        const formatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }
        const dateTime = dateObj.toLocaleString('en-us', formatOptions)

        card += `
    <article class = 'card'>
    <p>${dateTime}, ${data.location}</p>
    <h2>${data.title}</h2>
    <p>${data.text}</p>
    </article>`
    })

    cardcontainer.innerHTML = card
    currentIndex += batchSize

    if(currentIndex >= sightings.length) {
        loadMore.style.display = 'none'
    }
}

renderCards()
loadMore.addEventListener('click', renderCards)