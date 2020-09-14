const express = require('express');
const router = express.Router();
const article  = require('../sqlDir/article');
const passport = require('passport')
router.get('/page/:category/:page',(req,res)=>{
    article.page(req.params.category,req.params.page,(rows)=>{
        res.json({message:rows})
    })
})
router.post('/add',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const {title, create_user, content, category,description } = req.body
    const {id,username} = req.user
    console.log(title, create_user, content, category,description)
    article.add(title, username, content,category, description,id ,(key)=>{
        res.json({message:key})
    })
})
router.get('/details/:id',(req,res)=>{
    article.details(req.params.id,(rows)=>{
        res.json(rows)
    })
})
router.get('/delete/:id',(req,res)=>{
    article.delete(req.params.id,(key)=>{
        res.json({
            message:key
        })
    })
})

router.post('/update',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const {title, content, category,description,articleId } = req.body
    const {id} = req.user
    article.update(title, content,category, description,articleId ,(key)=>{
        res.json({message:key})
    })
})
module.exports = router;
