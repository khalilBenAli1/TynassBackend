const express = require("express");
const { connectToDatabase } = require("./config/database");
const http = require('http');
const { Server } = require('socket.io');
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

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use("/api/user", userRoute);
app.use("/api/trip", tripRoute);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://srv417723.hstgr.cloud:3000',
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.set('io', io);

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
