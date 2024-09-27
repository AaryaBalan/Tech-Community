const queryId = +window.location.href.split('/')[window.location.href.split('/').length - 1]
console.log(queryId)

async function getQueries() {
    // document.querySelector('#authorName').value = localStorage.getItem('username')
    const queries = await fetch('/queries')
    const queriesJson = await queries.json()
    const expectedQuery = queriesJson.find(query => query.id == queryId)
    console.log(expectedQuery)
    let html = ''
    if (expectedQuery) {
        const ansHTML = expectedQuery.answer.map(ans => {
            return (
                `
            <div class="user-ans">
                <div class="single-ans">
                    <div class="single-ans-container">
                        <div class="ans-pic">${ans.username[0].toUpperCase()}</div>
                        <div class="ans-container">
                            <a href='/${ans.username}' class="person-name">${ans.username.toUpperCase()}</a>
                            <div class="ans-content">
                                ${ans.answer}
                            </div>
                            <div class="time">${ans.time}</div>
                        </div>
                    </div>
                </div>
            </div>
            `
            )
        })

        html = `
            
            <div class="query-main-1" id="#query">
                <div class="recent-query">
                    <div class="query-info">
                        <div class="profile-pic">${expectedQuery.authorName[0].toUpperCase()}</div>
                        <div class="query-container">
                            <a class='person-link' href='/${expectedQuery.authorName}' class="person-name">${expectedQuery.authorName.toUpperCase()}</a>
                            <a href="" class="query-title">${expectedQuery.title}</a>
                            <div class="query-content">${expectedQuery.content}</div>
                        </div>
                        <div class="time">${expectedQuery.time}</div>
                    </div>
                    <div class='ans-user-area'>
                    ${ansHTML}
                    </div>
                </div>
                <form action="/submitAns" method="post" class="ans-area" id="ans-area">
                    <input type="text" name="username" id="username" value="${localStorage.getItem('username')}" hidden>
                    <input type="number" name="id" id="" value='${expectedQuery.id}' hidden>
                    <textarea name="answer" id="answer" placeholder="Help ${expectedQuery.authorName.toUpperCase()}" required></textarea>
                    <button class="submit-ans" type="submit"><i class="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>

            `
    }

    document.querySelector('.recent-container').innerHTML = html
}

getQueries()
