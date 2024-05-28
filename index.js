"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
/*
 * $ npm init -y
 * $ npm i express dotenv express-async-errors
 * $ npm i mongoose
 * $ npm i morgan swagger-autogen swagger-ui-express redoc-express
 * $ mkdir logs
 * $  nodemon
    https://www.toptal.com/developers/gitignore/
 */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "127.0.0.1";

/* ------------------------------------------------------- */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session
const session = require("cookie-session");
app.use(
  session({ secret: process.env.SECRET_KEY || "secret_keys_for_cookies" })
);

/* ------------------------------------------------------- */
// Configrations:

// Connect to MongoDB with Mongoose:
require("./src/configs/dbConnection");
/* ------------------------------------------------------- */

// Accept json data & convert to object:
app.use(express.json());

// Middlewares
//Searching&Sorting&Pagination:
app.use(require("./src/middlewares/findSearchSortPage"));

// HOMEPATH:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to BLOG API",
    documets: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// Routes:
app.use(require("./src/routes"));

/* ------------------------------------------------------- */
// Synchronization:
// require('./src/sync')()

// errorHandler:
app.use(require("./src/errorHandler"));

app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));
