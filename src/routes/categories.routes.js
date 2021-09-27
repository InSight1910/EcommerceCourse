const express = require("express");
const router = express.Router();

const {
	categories: {
		newCategory,
		deleteCategory,
		getListOfCategories,
		getCategory,
		updateCategory,
	},
} = require("../controllers");

router.get(`/`, getListOfCategories);
router.get(`/:id`, getCategory);
router.post(`/`, newCategory);
router.put(`/:id`, updateCategory);
router.delete(`/:id`, deleteCategory);

module.exports = router;
