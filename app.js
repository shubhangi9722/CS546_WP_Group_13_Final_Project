const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const session = require('express-session');
app.use(
    session({
      name: 'AuthCookie',
      secret: "This is a secret.. shhh don't tell anyone",
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 6000000 }
    })
  );

  app.use(async (req, res,next) => {
    const currenttimestamp= new Date().toUTCString();
    const method= req.method;
    const routerurl=req.originalUrl;
    const authenticatedStatus=req.session.user?"(Authenticated User)":"(Non-Authenticated User)"    
    console.log(`[${currenttimestamp}]: ${method} ${routerurl} ${authenticatedStatus}`);
    next();
  });


  app.use('/signup', (req, res,next) => {
    if (req.session.user) {
      return res.redirect('/private');
    } 
    else {
       next();
    }
  });

  app.use('/private', (req, res, next) => {
     if (!req.session.user) {
      res.statusCode = 403;
      next();
    } 
    else {
      next();
    }
  });


  app.use('/login', (req, res,next) => {
    if (req.session.user) {
      return res.redirect('/private');
    } else {
       next();
    }
  });

  app.use('/logout', (req, res,next) => {
  
       next();
    
  });



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});