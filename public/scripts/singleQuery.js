// initial()
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
                            <a href="query/${expectedQuery.id}" class="query-title">${expectedQuery.title}</a>
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

    

    console.log(html)
    // if (html == '') {
    //     html = `
    //     <div class="start-discussion">
    //         <img src="images/start_discussion.svg" alt="">
    //         <h1>Why hesitation ? <br>Start Your DIscussion!</h1>
    //     </div>
    //     `
    // }
    document.querySelector('.recent-container').innerHTML = html
}

getQueries()


// function initial() {
//     let pageHTML = ''
//     if (!localStorage.getItem('username')) {
//         pageHTML = `

//         <div class="banner">
//             <img src="images/tech_community.svg" alt="">
//             <div class="banner-text-section">
//                 <div class="banner-slogan">
//                     Skip the Scroll, Join the Code
//                 </div>
//                 <div class="banner-text">
//                     "Why waste time on social media when you can build, innovate, and connect with like-minded tech
//                     enthusiasts? Join our
//                     community, where coding meets collaboration, and ideas turn into reality!"
//                 </div>
//             </div>
//         </div>

//         <div class="banner2">
//             <div class="left-banner">
//                 <img class="banner2-img" src="images/discussion.svg" alt="">
//                 <div class="banner-label">
//                     Don’t just scroll, discuss and build! Join our tech community where every conversation sparks
//                     innovation
//                     and
//                     collaboration drives success.
//                 </div>
//             </div>

//             <div class="right-banner">
//                 <img class="banner2-img" src="images/connect.svg" alt="">
//                 <div class="banner-label">
//                     Where innovation meets connection—join our community and collaborate with tech enthusiasts who are
//                     as
//                     passionate as you!
//                 </div>
//             </div>
//         </div>



//         <a class="gotoprofile" href="/profile">JOIN</a>
//         `
//     } else {
//         pageHTML = `
//             <main>
//                 <div class="recent-query-header">
//                     Recent Queries
//                 </div>
//                 <div class="recent-container" id="query">
                    
//                 </div>
//             </main>
//         `
//     }


//     document.querySelector('section').innerHTML = pageHTML
// }
