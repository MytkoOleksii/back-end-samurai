//const express = require('express')  // old
import {app} from "./src/app";
//import cors from 'cors'


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


/* method POST
fetch('http://localhost:3000/courses', { method: 'post', body: JSON.stringify({title: 'Hi'}),
    headers: {
        'content-type': 'application/json'
    }})
.then(res => res.json())
.then(json => console.log(json))
 */