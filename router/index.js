const express = require("express");
const router = express.Router();

const classRoute = require("./classRoute");
const instructorRoute = require("./instructorRoute");
const studentRoute = require("./studentRoute");
const userRoute = require("./userRoute");

router.use("/class", classRoute);
router.use("/instructor", instructorRoute);
router.use("/student", studentRoute);
router.use("/user", userRoute);

module.exports = router;
