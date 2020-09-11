const express = require('express');
const router = express.Router();
const user  = require('../sqlDir/user');
const bcrypt = require('bcrypt');
router.post('/login',(req,res)=>{
    const {title, create_user, content, category,description } = req.body
    user.login(title, create_user, content,category, description, (key)=>{
        res.json({msg:key})
    })
})
router.post('/register',(req,res)=>{
    const {email, username, password} = req.body
    //依赖模块 bcrypt
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                res.json({
                    msg: 0,
                    message: '注册失败',
                    err
                })
            }
        })
    })
    // user.register(title, create_user, content,category, description, (key)=>{
    //     res.json({msg:key})
    // })
})


module.exports = router;
