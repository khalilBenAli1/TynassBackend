const express = require("express");
const { connectToDatabase } = require("./config/database");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const session = require('express-session');
const passport = require("passport");
const initializePassport = require("./config/passport");
const flash = require('connect-flash');
const userRoute = require ('./routes/UserRoute')
const tripRoute = require ('./routes/TripRoute')



connectToDatabase();

app.use(express.json());
app.use(cors());
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport(passport);
app.use(passport.session());
app.use("/api/user", userRoute);
app.use("/api/trip", tripRoute);

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
