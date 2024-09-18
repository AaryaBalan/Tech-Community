async function getUser(username) {
    const user = await fetch(`/api/${username}`)
    const userJson = await user.json()
    const html = `
        <div class="user-info-section">
            <div class="profile-pic">
                <img src="images/profile.png" alt="">
            </div>
            <div class="user-info">
                <div class="name">Name: <span>${userJson.username.toUpperCase()}</span></div>
                <div class="email">Email: <span><a
                            href="mailto:${userJson.email}">${userJson.email}</a></span></div>
                <div class="gender">Gender: <span>${userJson.gender}</span></div>
                <div class="bio">Bio: <span>${userJson.bio}</span></div>
            </div>
        </div>
    `
    document.querySelector('.user-info-container').innerHTML = html
}

getUser(document.querySelector('.demo').innerHTML)