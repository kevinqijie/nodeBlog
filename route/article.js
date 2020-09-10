const express = require('express');
const router = express.Router();
const article  = require('../sqlDir/article');
router.get('/page/:category/:page',(req,res)=>{
    article.page(req.params.category,req.params.page,(rows)=>{
        res.json({msg:rows})
    })
})
router.post('/add',(req,res)=>{
    const {title, create_user, content, category,description } = req.body
    article.add(title, create_user, content,category, description, (key)=>{

        res.json({msg:key})
    })
})

module.exports = router;
