const express = require('express')
const { url } = require('inspector')
const app = express()
// const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let queries = []
let users = []
let name = ''

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/submitted', (req, res) => {
    const queryData = {
        ...req.body,
        id: queries.length + 1,
        answer: []
    }
    queries.push(queryData)
    console.log(queryData)
    res.redirect('/#query')
})

app.post('/submitAns', (req, res) => {
    const queryData = queries.find(query => {
        return query.id == req.body.id
    })
    queryData.answer.push(req.body)
    queries[req.body.id - 1] = queryData
    console.log(queryData)
    res.redirect('/#query')
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
    console.log(users)
    res.redirect('/#query')
})

app.get('/trending', (req, res) => {
    res.render('trending.ejs')
})

app.get('/:name', (req, res) => {
    // const data = users.find(user => user.username == req.params.usernaaaryame)
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