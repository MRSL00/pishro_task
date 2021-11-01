const express = require("express");
const router = express.Router();

router.use("/api", require("./app.router"));

module.exports = router;