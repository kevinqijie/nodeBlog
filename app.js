
const express = require('express')
const app = express()
const {port} = require('./config/index')
const bodyParser = require('body-parser');
const {test,article} = require('./route/index')
app.get('/', (req, res) => res.send('Hello World!'))
app.use(test);
//post 安装 body-parser
// 使用body-parser中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/article',article);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
