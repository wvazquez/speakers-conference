const express = require('express');
const router = express.Router();

// Node.js defaults to index.js
const route_speakers = require('./speakers');
const route_feedback = require('./feedback');

module.exports = () => {
    router.get('/', (req,res, next)=>{
        return res.send("Hello, Welcome to speakers conference.");
    });
    router.use('/speakers', route_speakers());
    router.use('/feedback', route_feedback());

    return router;
};