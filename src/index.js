const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

//Configurando variables locales
app.locals.script = "../links/js/prueba.js";
console.log("");
//configurar el servidor
app.set('port',8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname : '.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.urlencoded({extended: false}));

app.use(require('./routes'));
app.use('/links',require('./routes/links'));

//archivos publicos
app.use(express.static(path.join(__dirname, 'views/links')));
//inciar servidor
app.listen(app.get('port'), ()=>{
    console.log('Server en : ', app.get('port')); 
});