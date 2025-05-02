const express = require("express");
const connectDB = require("./config/db");
var compression = require("compression");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var session = require("express-session");
var cookieParser = require("cookie-parser");

const app = express();
app.use(compression());
require("dotenv").load();

// Set up mongoose connection
var port = process.env.PORT || 5000;
connectDB();

// set up our express application
app.use(cookieParser());

app.use(
  session({
    secret: "mernAuthentication",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Import routes
var user_routes = require("./routes/user");

//Register Routes
app.use("/api/users", user_routes);

app.listen(port, () => `Server running on port ${port}`);
