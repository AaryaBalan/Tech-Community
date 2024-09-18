const express = require('express')
const { url } = require('inspector')
const app = express()
const {getHomePage} = require('./utility/utility')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let queries = []
let users = []
let name = ''

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/submitted', (req, res) => {
    const date = new Date()
    const queryData = {
        ...req.body,
        id: queries.length + 1,
        answer: [],
        time: `${months[date.getMonth()]} ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    }
    queries.push(queryData)
    console.log(queryData)
    res.redirect('trending#query')
})

app.post('/submitAns', (req, res) => {
    const date = new Date()
    const queryData = queries.find(query => {
        return query.id == req.body.id
    })
    queryData.answer.push({ ...req.body, time: `${months[date.getMonth()]} ${date.getDate()} ${date.getHours()}:${date.getMinutes()}` })
    queries[req.body.id - 1] = queryData
    console.log(queryData)
    res.redirect('trending#query')
})

app.get('/queries', (req, res) => {
    res.json(queries)
})


app.get('/profile', (req, res) => {
    res.render('profile.ejs')
})

app.post('/saveProfile', (req, res) => {
    name = req.body.username
    users.push({...req.body, userId: users.length+1})
    users = users.reverse()
    console.log(users)
    res.redirect('/')
})

app.get('/trending', (req, res) => {
    res.render('trending.ejs')
})

app.get('/ask', (req, res) => {
    res.render('ask.ejs')
})

app.get('/query/:id', (req, res) => {
    res.render('singleQuery.ejs')
})

app.get('/:name', (req, res) => {
    res.render('user.ejs', {
        username: req.params.name
    })
})

app.get('/api/:username', (req, res) => {
    const userData = users.find(user => user.username == req.params.username)
    res.json(userData)
})




app.use(express.static('public'))

app.listen(9000, () => {
    console.log('Port is running at 9000')
})