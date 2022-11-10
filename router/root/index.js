const express = require('express');
const router = express.Router();


//get
router.get('/', (req, res) => {
    res.send("Hello World")
});


//post

module.exports = router