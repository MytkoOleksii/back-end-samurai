
/*const express = require('express')*/  // old
import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const a = 4 ;
    if(a > 5) {
        res.send('OK less 5')
    } else {
        res.send('Hello World wtf !')
    }
})
app.get('/users', (req, res) => {
    res.send('Hello User!!!!!')
})
app.post('/users', (req, res) => {
    res.send('We have created new user!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})