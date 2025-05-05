const express = require("express");
const router = express.Router();

const {Create, Delete, Get, Update} = require("../controller/studentController");



router.post("/create",  Create);

router.delete("/delete/student_id/:student_id",  Delete);

router.get("/get/student_id/:student_id",  Get);

router.put("/update/student_id/:student_id",  Update);

module.exports = router;