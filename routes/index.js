const custsigninRoutes = require("./customerSignin");
const custsignupRoutes = require("./customerSignup");
const sittersigninRoutes = require("./sitterSignin");
const sittersignupRoutes = require("./sitterSignup");
const customerDashboardRoutes = require("./customerDashboard");
const sitterDashboardRoutes = require("./sitterDashboard");
const bookingRoutes = require("./booking");
const landingRoutes = require("./landing");
const logoutRoutes = require("./logout");
const SitterBookingRoutes = require("./sitterbookingR");


const constructorMethod = (app) => {
  //app.use(xss());
  app.use("/booking", bookingRoutes);
  app.use("/sitterbooking", SitterBookingRoutes);
  app.use("/customerSignin", custsigninRoutes);
  app.use("/customerSignup", custsignupRoutes);
  app.use("/sitterSignin", sittersigninRoutes);
  app.use("/sitterSignup", sittersignupRoutes);
  app.use("/customerDashboard", customerDashboardRoutes);
  app.use("/sitterDashboard", sitterDashboardRoutes);
  app.use("/logout", logoutRoutes);
  app.use("/", landingRoutes);

  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
