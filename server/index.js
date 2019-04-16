const express = require('express');
const hbs = require('express-handlebars');
const createErrors = require('http-errors');
const path = require('path');
const routes = require('./routes');
const configs = require('./config');

const app = express();

const config = configs[app.get('env')];

// static assets in public folder
app.use(express.static('public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.locals.title = config.sitename;
console.log(app.locals.title);

// Temp solution for no favicon found
app.get('/favicon.ico', (req,res,next)=>{
    return res.sendStatus(204);
});

// modular routing
app.use('/', routes());

app.use((req,res,next) => {
    return next(createErrors(404, "Page Not Found"));
});

app.use((err,req,res,next) => {
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    return res.render('error');
});

app.listen(3000);

module.export = app;