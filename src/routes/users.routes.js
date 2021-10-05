const express = require("express");
const { User } = require("../models/user.model");
const {
	users: { getUser, getCountUser },
} = require("../controllers");

const router = express.Router();

router.get(`/`, async (req, res) => {
	const userList = await User.find({});
	if (!userList) {
		res.status(500).json({ success: false });
	}
	res.send(userList);
});
router.get(`/:id`, getUser);
router.get(`/get/count`, getCountUser);

module.exports = router;
