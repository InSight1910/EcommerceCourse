const express = require("express");
const { User } = require("../models/user.model");
const {
	users: { getUsers, getUser, getCountUser },
} = require("../controllers");

const router = express.Router();

router.get(`/`, getUsers);
router.get(`/:id`, getUser);
router.get(`/get/count`, getCountUser);

module.exports = router;
