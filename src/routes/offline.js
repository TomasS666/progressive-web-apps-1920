const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/offline', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'../../build/offline.html'))
})

module.exports = router;