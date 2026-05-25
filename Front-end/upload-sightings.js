const form = document.querySelector('#inputarea')
const titleinp = document.querySelector('#title')
const timedateinp = document.querySelector('#time-date')
const locationinp = document.querySelector('#location')
const detailsinp = document.querySelector('#details')
const submit = document.querySelector('#submit')
const message = document.querySelector('#message')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const title = titleinp.value.trim()
    const timedate = timedateinp.value.trim()
    const location = locationinp.value.trim()
    const details = detailsinp.value.trim()

    try {
        if (title && timedate && location && details) {
            const content = {
                "location": location,
                "timestamp": timedate,
                "title": title,
                "text": details
            }
            const response = await fetch("/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(content)
            })
            if (response.ok) {
                message.innerHTML = `Your sighting was uploaded<br>You can view it <a href = "./sightings.html">here</a>`
                form.reset()
            }
            else {
                message.innerHTML = `There was an error uploading your sighting!!`
            }
        }
        else {
            message.innerHTML = `Please enter all the details and try again`
        }
    }

    catch(err) {
        message.innerHTML = `There was an error uploading your sighting`
        console.log(err)
    }
})