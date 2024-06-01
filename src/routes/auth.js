"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Blog Api
------------------------------------------------------- */

const router = require("express").Router();
const auth = require("../controllers/auth");

// URL: auth

router.post("/login", auth.login);
router.post("/refresh", auth.login);
router.post("/logout", auth.login);

module.exports = router;
