const express = require('express');
const router = express.Router();
const article  = require('../sqlDir/article');
const passport = require('passport')
/**
 * @Description:
 * @author 七戒
 * 获取文章列表
 * @date 2020/9/15
*/
router.get('/page/:category/:page',(req,res)=>{
    article.page(req.params.category,req.params.page,(obj)=>{
        res.json(obj)
    })
})
router.post('/add',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const {title,content, category,description } = req.body
    const {id,username} = req.user
    article.add(title, username, content,category, description,id ,(key)=>{
        res.json({message:key})
    })
})
/**
 * @Description:
 * @author 七戒
 * 获取文章
 * @date 2020/9/15
*/
router.get('/details/:id',(req,res)=>{
    article.details(req.params.id,(rows)=>{
        res.json(rows)
    })
})
/**
 * @Description:
 * @author 七戒
 * 删除文章
 * @date 2020/9/15
*/
router.get('/delete/:id',(req,res)=>{
    article.delete(req.params.id,(key)=>{
        res.json({
            message:key
        })
    })
})
/**
 * @Description:
 * @author 七戒
 * 更新文章
 * @date 2020/9/15
*/
router.post('/update',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const {title, content, category,description,articleId } = req.body
    const {id} = req.user
    article.update(title, content,category, description,articleId ,(key)=>{
        res.json({message:key})
    })
})
/**
 * @Description:
 * @author 七戒
 * 获取热门文章列表
 * @date 2020/9/15
*/
router.get('/hot',(req,res)=>{
    article.hot((key)=>{
        res.json({
            message:key
        })
    })
})
/**
 * @Description:
 * @author 七戒
 * 获取最新文章列表
 * @date 2020/9/15
*/
router.get('/updateTime',(req,res)=>{
    article.updateTime((key)=>{
        res.json({
            message:key
        })
    })
})
module.exports = router;
