const express = require('express');
const router = express.Router();
const path = require('path')

// Local data
// const data = require("../helpers/fakeData")
const genreIdList = require("../helpers/genreIdList")


router.get('/', (req, res, next)=>{
    res.sendFile(path.resolve(__dirname,'../../build/index.html'))
})

module.exports = router;