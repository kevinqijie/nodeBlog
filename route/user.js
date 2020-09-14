const express = require('express');
const router = express.Router();
const user = require('../sqlDir/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    const {email, password} = req.body
    user.login(email, (row) => {
        if (row == -1) {
            res.json({
                msg: "0",
                message: '登录失败！'
            })
            return false
        }
        if (row == 0) {
            res.json({
                msg: "0",
                message: '用户不存在！'
            })
            return false
        }
        //要检查密码 bcrypt
        bcrypt.compare(password, row.password)
            .then(isPasswrod => {
                if (isPasswrod) {
                    const rule = {
                        id: row.id,
                        username: row.username
                    }
                    // 规则 rule  加密名字 secret   过期时间expiresIn:3600  回调()=>{}
                    jwt.sign(rule, 'secret', {expiresIn: 36000}, (err, token) => {
                        if (err) throw err;
                        res.json({
                            msg: "1",
                            token: "Bearer " + token,
                            message: '登陆成功'
                        })
                    })

                } else {
                    return res.status(400).json({
                        msg: '0',
                        message: '密码错误！'
                    })
                }
            })
    })
})


/**
 *
 */
router.post('/register', (req, res) => {
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
                return false
            }
            user.register(email, username, hash, (key) => {
                res.json({message: key})
            })
        })
    })
    // user.register(title, create_user, content,category, description, (key)=>{
    //     res.json({msg:key})
    // })
})

router.get('/verificationEmail', (req, res) => {
    const {email} = req.body
    user.verificationEmail(email, (key) => {
        if(key==-1){
            res.json({message: "未知错误"})
        }
        if(key==0){
            res.json(true)
        }
        if(key==1){
            res.json(false)
        }
    })
})
module.exports = router;
