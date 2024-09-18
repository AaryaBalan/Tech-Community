initial()

async function getQueries() {
    document.querySelector('#authorName').value = localStorage.getItem('username')
    const queries = await fetch('/queries')
    const queriesJson = await queries.json()
    const recentQuery = queriesJson[queriesJson.length - 1]
    let html = ""
    if (recentQuery) {
        const ansHTML = recentQuery.answer.map(ans => {
            return (
                `
                <div class="user-ans">
                    <div class="single-ans">
                        <div class="single-ans-container">
                            <div class="ans-pic">${ans.username[0].toUpperCase()}</div>
                            <div class="ans-container">
                            <a href='/${ans.username}' class="person-name">${ans.username.toUpperCase()}</a>
                                <div class="ans-content">
                                    ${ans.answer.slice(0, 200)}
                                </div>
                            </div>
                        </div>
                        <div class="time">${ans.time}</div>
                    </div>
                </div>
                `
            )
        })

        html =
            `
                <div class="query-main-1">
                    <div class="recent-query">
                        <div class="query-info">
                            <div class="profile-pic">${recentQuery.authorName[0].toUpperCase()}</div>
                            <div class="query-container">
                                <a class='person-link' href='/${recentQuery.authorName}' class="person-name">${recentQuery.authorName.toUpperCase()}</a>
                                <div class="query-title">${recentQuery.title.slice(0, 40)}</div>
                                <div class="query-content">${recentQuery.content.slice(0, 200)}</div>
                            </div>
                        <div class="time">${recentQuery.time}</div>
                        </div>
                        <div class='ans-user-area'>
                        ${ansHTML}
                        </div>
                    </div>
                    <form action="/submitAns" method="post" class="ans-area" id="ans-area">
                        <input type="text" name="username" id="username" value="${localStorage.getItem('username')}" hidden>
                        <input type="number" name="id" id="" value='${recentQuery.id}' hidden>
                        <textarea name="answer" id="answer" placeholder="Help ${recentQuery.authorName.toUpperCase()}" required></textarea>
                        <button class="submit-ans" type="submit"><i class="fa-solid fa-paper-plane"></i></button>
                    </form>
                </div>
    
                `
    }
    console.log(html)
    if (html == '') {
        html = `
        <div class="start-discussion">
            <img src="images/start_discussion.svg" alt="">
            <h1>Why hesitation ? <br>Start Your DIscussion!</h1>
        </div>
        `
    }
    document.querySelector('.recent-container').innerHTML = html
}

getQueries()


function initial() {
    let pageHTML = ''
    if (!localStorage.getItem('username')) {
        pageHTML = '<a class="gotoprofile" href="/profile">JOIN</a>'
    } else {
        pageHTML = `
            <div class="ask-your-query">
                <h1>Ask you query</h1>
                <form action="/submitted" method="post" class="ask-query-container">
                    <input type="text" name="authorName" id="authorName" value="" hidden>
                    <input type="text" name="title" id="title" placeholder="Title..." required>
                    <textarea name="content" id="content" placeholder="Query..." required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <main>
                <div class="recent-query-header">
                    Recent Queries
                </div>
                <div class="recent-container" id="query">
                    
                </div>
            </main>
        `
    }

    document.querySelector('section').innerHTML = pageHTML
}
