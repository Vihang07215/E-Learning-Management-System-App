const express = require("express");
const router = express.Router();

const {Create, Delete, Get, getAllClasss, Update} = require("../controller/classController");



router.post("/create",  Create);

router.delete("/delete/class_id/:class_id",  Delete);

router.get("/get/class_id/:class_id",  Get);

router.get("/allclass",  getAllClasss);

router.put("/update/class_id/:class_id",  Update);

module.exports = router;