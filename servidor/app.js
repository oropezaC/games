var express =require("express");
var bodyParser = require("body-parser")
var path = require('path');
var cookieParser = require("cookie-parser");
var expressSession = require('express-session');

const db = require('./model/main');
db.connect()

var app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static(path.join(__dirname,'..','public')));
app.use(bodyParser());

app.use(cookieParser());
app.use(expressSession({secret:'515s15s51a5sdasasd51s84das4'}));

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({
  layoutsDir: path.join(__dirname, '..','cliente','view','layouts'),
  defaultLayout: 'main',
  extname:'hbs'

}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '..','cliente','view'));


app.use('/', require('./route/nav'));
app.use('/apiGames', require('./route/games'));




app.listen(3020, function (){
  console.log("Escuchando en el puerto 3020");
});
