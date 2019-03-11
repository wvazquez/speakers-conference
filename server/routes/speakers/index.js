const express = require('express');
const router = express.Router();

module.exports = () => {
    router.get('/', (req,res,next)=>{
        return res.send("All speakers");
    });
    router.get('/:name', (req,res,next)=>{
        return res.send(`Speaker ${req.params.name}`);
    });
    return router;
};