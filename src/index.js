const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const { captureRejectionSymbol } = require('events');

require('./lib/passport');

//configurar el servidor
app.set('port',8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    layout: 'login',
    layoutsDir: path.join(app.get('views'),'layouts'), 
    partialsDir: path.join(app.get('views'),'partials'),
    extname : '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//globales
app.use((req,res,next)=>{
    app.locals.user= req.user;
    console.log('xd',req.user);
    next();
});
//rutas

app.use(require('./routes'));
app.use('/links',require('./routes/links'));


//archivos publicos

//inciar servidor
app.listen(app.get('port'), ()=>{
    console.log('Server en : ', app.get('port')); 
}); 