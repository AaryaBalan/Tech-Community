function radioClicked() {
    const inputs = document.querySelectorAll('.radio-input')
    inputs.forEach(input => {
        return input.addEventListener('click', () => {
            localStorage.setItem('gender', input.value)
            console.log(input.value)
        })
    })
}

radioClicked()

document.querySelector('form').addEventListener('submit', (e) => {
    localStorage.setItem('username', document.querySelector('#username').value.toLowerCase())
    localStorage.setItem('email', document.querySelector('#email').value)
    localStorage.setItem('bio', document.querySelector('#bio').value)
})

document.querySelector('#username').value = localStorage.getItem('username')
document.querySelector('#email').value = localStorage.getItem('email')
document.querySelector('#bio').value = localStorage.getItem('bio')
document.querySelector(`#${localStorage.getItem('gender')}`).checked = true

async function getMyQuery() {
    const queries = await fetch('/queries')
    const queriesJson = await queries.json()
    const myQueries = queriesJson.filter(query => query.authorName == localStorage.getItem('username'))
    let myQueryHtml = ''
    myQueries.forEach(query => {
        myQueryHtml +=
            `
                <div class="recent-query">
                    <div class="query-info">
                        <div class="profile-pic">${query.authorName[0].toUpperCase()}</div>
                        <div class="query-container">
                            <a class='person-link' href='/${query.authorName}' class="person-name">${query.authorName.toUpperCase()}</a>
                            <a href="query/${query.id}" class="query-title">${query.title.slice(0, 40)}</a>
                            <div class="query-content">${query.content.slice(0, 200)}</div>
                        </div>
                        <div class="time">${query.time}</div>
                    </div>
                </div>

            `
    })
    if (myQueryHtml != "") {
        document.querySelector('.recent-container1').innerHTML = myQueryHtml
    }
}
getMyQuery()