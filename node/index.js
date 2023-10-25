const { createTable, insertTable, selectTable } = require('./db.js')
const express = require('express')
const path = require('path')
const app = express()
app.set('view engine', 'ejs');
app.set('views', './views');
const port = 3000

createTable()

app.get('/', (req,res) => {
    insertTable()
        .then(() => {
            renderPeople(res)
        })
        .catch(error => {
            console.error('Error to insert into table:', error)
            renderPeople(res)
        })
})

function renderPeople(res) {
    selectTable()
        .then(result => {
            res.render('people', {people: result})
        })
        .catch(error => {
            console.error('Error to select table:', error)
            res.render('people', {people: []})
        })
}

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})