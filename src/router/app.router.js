const express = require("express");
const router = express.Router();
const {
  addNewUserController,
  getLastAvgController,
} = require("../controller/app.controller");

router.post("/add-user", addNewUserController);
router.get("/get-avg", getLastAvgController);

module.exports = router;
