const custsigninRoutes = require('./customerSignin');
const custsignupRoutes = require('./customerSignup');
const sittersigninRoutes = require('./sitterSignin');
const sittersignupRoutes = require('./sitterSignup');
const landingRoutes = require('./landing');

const constructorMethod = (app) => {
  app.use('/login', custsigninRoutes);
  app.use('/signup',custsignupRoutes);
  app.use('/private',sittersigninRoutes);
  app.use('/logout',sittersignupRoutes);
  app.use('/',landingRoutes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;