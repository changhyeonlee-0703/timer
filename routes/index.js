const express = require("express");
const Time = require("./time");

const router = express.Router();

router.use("/time", Time);

module.exports = router;