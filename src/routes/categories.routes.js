const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

const { newCategory } = require("../controllers/index");

router.get(`/`, async (req, res) => {
	const categoryList = await Category.find();

	if (!categoryList) {
		res.status(500).json({ success: false });
	}
	res.send(categoryList);
});

router.post(`/`, newCategory);

module.exports = router;
