
const express = require('express')
const app = express()
const {port} = require('./config/index')
const bodyParser = require('body-parser');
const {test,article,user} = require('./route/index')
const passport = require('passport');

//初始化passport
app.use(passport.initialize());

//require ('引入地址')(反向赋值)
require('./config/passport')(passport);
app.get('/', (req, res) => res.send('Hello World!'))
app.use(test);
//post 安装 body-parser
// 使用body-parser中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/article',article);
app.use('/jwt',user);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
