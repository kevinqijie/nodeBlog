
const express = require('express')
const app = express()
const {port} = require('./config/index')
const {test} = require('./route/index')
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api',test);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
