const express = require("express");
const router = express.Router();

// Add new profile
router.get("/add", (req, res, next) => {
	res.render("addProfile/addProfile")
});

module.exports = router;
