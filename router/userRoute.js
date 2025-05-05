const express = require("express");
const router = express.Router();

const {Create, Delete, Get, loginValidate, Update} = require("../controller/userController");



router.post("/create",  Create);

router.delete("/delete/user_id/:user_id",  Delete);

router.get("/get/user_id/:user_id",  Get);

router.post("/loginvalidate",  loginValidate);

router.put("/update/user_id/:user_id",  Update);

module.exports = router;