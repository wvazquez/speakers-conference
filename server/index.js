const express = require('express');
const createErrors = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');


module.exports = (config) =>{
    const app = express();


    const speakerService = new SpeakerService(config.data.speakers);
    const feedbackService = new FeedbackService(config.data.feedback);


    // static assets in public folder
    app.use(express.static('public'));

    // view engine setup
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, './views'));

    app.use(bodyParser.urlencoded({ extended: true }));

    // formats page source to have whitespace in development mode
    if(app.get('env') === 'development'){
        app.locals.pretty = true;
    }


    app.locals.title = config.sitename;
    console.log(app.locals.title);

    // Temp solution for no favicon found
    app.get('/favicon.ico', (req,res,next)=>{
        return res.sendStatus(204);
    });

    app.use(async (req,res,next) => {
        try {
            const names = await speakerService.getNames();
            res.locals.speakerNames = names;
            return next();
        } catch (err) {
            return next(err)
        }
    });

    // modular routing
    app.use('/', routes({
        speakerService,
        feedbackService,
    }));

    // If we reach this point, we know no other routes have been found.
    // This is a normal route that is matched if no other routes have matched. 
    // Our route will match and send an error to next() and pass to error handler
    app.use((req,res,next) => {
        return next(createErrors(404, "Page Not Found"));
    });

    // error handler function that will handle any error passed through next()
    app.use((err,req,res,next) => {
        const status = err.status || 500;
        res.locals.status = status;
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(status);
        return res.render('error');
    });

    return app;
}