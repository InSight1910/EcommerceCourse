const Category = require("../models/category.model");
const { isValidObjectId } = require("mongoose");

const getListOfCategories = async (req, res) => {
	const categoryList = await Category.find({});

	if (!categoryList) {
		res.status(500).json({ success: false });
	}
	res.send(categoryList);
};
const getCategory = async (req, res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		const categoryList = await Category.findById(id);
		if (!categoryList) {
			res.status(404).json({
				success: false,
				message: "The ID that you provided was not found.",
			});
		}
		res.status(200).send(categoryList);
	} else {
		res.status(500).json({
			success: false,
			message:
				"The ID that you provide isn't valid. Please try with an objectID valid. ",
		});
	}
};

const newCategory = async (req, res) => {
	const { name, icon, color } = req.params;
	const category = await new Category(
		{ name, icon, color },
		{ versionKey: false }
	).save();

	!category
		? res.status(404).send("The category cannot be created!")
		: res.send(category);
};

const updateCategory = async (req, res) => {
	const { id } = req.params;
	let category;
	const { name, color, icon } = req.body;
	if (!isValidObjectId(id)) {
		category = await Category.findByIdAndUpdate(
			id,
			{
				$set: {
					name,
					color,
					icon,
				},
			},
			{
				new: true,
			}
		);
		!category
			? res.status(404).json({
					success: false,
					message:
						"The ID of the category was not found. Try with other ID ",
			  })
			: res.status(200).json(category);
	} else {
		res.status(500).json({
			success: false,
			message:
				"The ID that you provide isn't valid. Please try with an objectID valid. ",
		});
	}
};

const deleteCategory = async (req, res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		const deletedCategory = await Category.findByIdAndDelete(id);
		deletedCategory
			? res.status(200).json({
					success: true,
					message: "The category was deleted successfully",
			  })
			: res.status(404).json({
					success: false,
					message:
						"The category was not found, try again with a different ID",
			  });
	} else {
		res.status(500).json({
			success: false,
			message:
				"The ID that you provide isn't valid. Please try with an objectID valid. ",
		});
	}
};
module.exports = {
	newCategory,
	deleteCategory,
	getListOfCategories,
	getCategory,
	updateCategory,
};
