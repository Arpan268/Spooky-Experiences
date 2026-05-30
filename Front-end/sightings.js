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
    <p class = 'story-text'>${data.text}</p>

    <button class="update-btn" data-id="${data.id}">Update Story</button>
    <button class="delete-btn" data-id="${data.id}">Delete Story</button>
    </article>`
    })

    cardcontainer.innerHTML = card
    currentIndex += batchSize

    if (currentIndex >= sightings.length) {
        loadMore.style.display = 'none'
    }
}

function buttonListeners() {
    const updateButtons = document.querySelectorAll('.update-btn')
    const deleteButtons = document.querySelectorAll('.delete-btn')

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {

            const isSure = window.confirm("Are you sure you want to delete this anomaly?")

            if(!isSure)
                return
            
            const id = event.target.getAttribute('data-id')
            const response = await fetch(`/api/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                event.target.closest('.card').remove()
            }
        })
    })

    updateButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id')
            const newText = prompt('Enter the new story text:')

            if (!newText) return

            const response = await fetch(`/api/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: newText })
            })
            if (response.ok) {
                const card = event.target.closest('.card')
                card.querySelector('.story-text').innerText = newText
            }
        })
    })

}


renderCards()
loadMore.addEventListener('click', renderCards)

buttonListeners()