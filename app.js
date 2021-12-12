const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const userData = require('./data/admin');
app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const session = require("express-session");
app.use(
  session({
    name: "AuthCookie",
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 6000000 },
  })
);

app.use(async (req, res, next) => {
  const currenttimestamp = new Date().toUTCString();
  const method = req.method;
  const routerurl = req.originalUrl;
  const authenticatedStatus = req.session.user
    ? "(Authenticated User)"
    : "(Non-Authenticated User)";
  console.log(
    `[${currenttimestamp}]: ${method} ${routerurl} ${authenticatedStatus}`
  );
  next();
});

app.use("/customerSignin", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/customerDashboard");
  } else {
    next();
  }
});

app.use("/sitterSignin", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/sitterDashboard");
  } else {
    next();
  }
});

app.use("/customerSignup", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/customerDashboard");
  } else {
    next();
  }
});

app.use("/sitterSignup", (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/sitterDashboard");
  } else {
    next();
  }
});

app.use("/customerDashboard", (req, res, next) => {
  if (!req.session.user) {
    res.statusCode = 403;
    next();
  } else {
    next();
  }
});

app.use("/sitterDashboard", (req, res, next) => {
  if (!req.session.user) {
    res.statusCode = 403;
    next();
  } else {
    next();
  }
});

app.use("/logout", (req, res, next) => {
  next();
});


// 1. One which will deny users who don't log in to access the /private path.
let admin = false;
app.use('/private', (req, res, next) => {
  if (!admin) {  // If user is not authenticated
    req.session.isLogIn = false;
    res.status(403).render('others/error', { errorDescription: "User is not logged in" , title: "error" })
  } else {
    req.session.isLogIn = true;
    next();  // hit /private route
  }
});


// 2. One which verify whether user is authenticated
const bcrypt = require('bcryptjs');
const saltRounds = 16;
app.use('/login', async (req, res, next) => {
  const aUserInfo = req.body;
  const { username, password } = aUserInfo;

  let userHashedPassword;
  let fN;
  let lN;
  let pro;
  let b;
  let id;

  for (let user of userData) {  // traverse authenticated user
    if (user.username === username) {
      userHashedPassword = user.hashedPassword;
      fN =  user.firstName;
      lN = user.lastName;
      pro = user.profession;
      b = user.bio;
      id = user._id;
      break;
    }
  }
  try {
    let match = await bcrypt.compare(password, userHashedPassword);
    if (match) {
      admin = true;
      req.session.isLogIn = true;
      req.session.user = { id: id, username: username, firstname: fN, lastname: lN, profession: pro, bio: b};  //store current user info in session
      res.cookie('AuthCookie');  //If the user provides a successful username / password combination, you will set a cookie named AuthCookie
    } else {
      admin = false;
      req.session.isLogIn = false;
    }
  } catch (e) {
    // console.log(e);
  }

  
  // log to your console for every request made to the server
  let crtTimeStamp = new Date().toUTCString();

  if (admin && req.session.isLogIn) {
    console.log(`[${crtTimeStamp}]: ${req.method} ${req.originalUrl} (Authenticated User)`);
    res.redirect('/private');
  } else {
    console.log(`[${crtTimeStamp}]: ${req.method} ${req.originalUrl} (Non-Authenticated User)`)
    req.method = 'POST'; 
    next();
  }
})



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
