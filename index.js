const express = require("express");
const { connectToDatabase } = require("./config/database");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const session = require('express-session');
const passport = require("passport");
const initializePassport = require("./config/passport");
const flash = require('connect-flash');
const userRoute = require ('./routes/UserRoute')
const tripRoute = require ('./routes/TripRoute')



connectToDatabase();

app.use(express.json());
const corsOptions = {
  origin: 'http://srv417723.hstgr.cloud:3000', 
  credentials: true, 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(flash());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
      secure: false,
    }
  })
);

initializePassport(passport);
app.use(passport.session());
app.use("/api/user", userRoute);
app.use("/api/trip", tripRoute);


app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
