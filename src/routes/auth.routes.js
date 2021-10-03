const express = require("express");
const {
	auth: { login, signUp },
} = require("../controllers");

const router = express.Router();

router.post(`/signup`, signUp);
router.post(`/login`, login);

module.exports = router;
