const eventSource = new EventSource('/api/news')

const newsdisplay = document.querySelector('#news')
newsdisplay.textContent = "Loading News..."

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const news = data.news

    newsdisplay.textContent = news
}

eventSource.onerror = () => {
    newsdisplay.textContent = "There was an error loading the news. Please try again later"
}