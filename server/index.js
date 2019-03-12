const express = require('express');
const exphbs = require('express-handlebars');
const createErrors = require('http-errors');
const routes = require('./routes');
const path = require('path');
const app = express();


app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


app.use(express.static('public'));
app.set('views', path.join(__dirname, './views'));

app.get('/favicon.ico', (req,res,next)=>{
    return res.sendStatus(204);
});
app.use('/', routes());
app.use((req,res,next) => {
    return next(createErrors(404, "File Not Found"));
});
app.use((err,req,res,next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    return res.render('404');
});

app.listen(3000);

module.exports = app;