const express = require("express");
const router = express.Router();

const {Create, Delete, Get, Update} = require("../controller/instructorController");



router.post("/create",  Create);

router.delete("/delete/instructor_id/:instructor_id",  Delete);

router.get("/get/instructor_id/:instructor_id",  Get);

router.put("/update/instructor_id/:instructor_id",  Update);

module.exports = router;