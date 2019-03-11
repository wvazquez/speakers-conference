const express = require('express');
const exphbs = require('express-handlebars');
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

app.listen(3000);

module.exports = app;