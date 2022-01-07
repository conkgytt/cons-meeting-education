const express = require("express");
const router = express.Router();
const { passport } = require("../index");

router.get("/google", (req, res, next) => {
	passport.authenticate("google", {
		scope: ["profile", "email"],
	});
});

module.exports = router;
