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

initializePassport(passport);
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
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
