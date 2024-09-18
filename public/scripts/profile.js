

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