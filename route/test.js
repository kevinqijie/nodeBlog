

const express = require('express');
const router = express.Router();
const Test = require('../sqlDir/test');
router.get('/test',(req,res)=>{
    // console.log(res,req)
    Test.print(1,(rows)=>{
        res.json({msg:rows})
    })
})

module.exports = router;
