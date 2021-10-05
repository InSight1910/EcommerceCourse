const { Category } = require("../models/category.model");
const {
	isValidObjectId,
	Error: { ValidationError },
} = require("mongoose");
const {
	NotFoundException,
	InvalidObjectIDException,
} = require("../helpers/errors");

const getListOfCategories = async (req, res, next) => {
	try {
		const categoryList = await Category.find({});
		if (!categoryList) {
			throw new NotFoundException();
		}
		res.send(categoryList);
	} catch (err) {
		next(err);
	}
};
const getCategory = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (isValidObjectId(id)) {
			const categoryList = await Category.findById(id);
			if (!categoryList) {
				throw new NotFoundException("category", "ID");
			}
			res.status(200).send(categoryList);
		} else {
			throw new InvalidObjectIDException();
		}
	} catch (error) {
		next(error);
	}
};

const newCategory = async (req, res, next) => {
	try {
		const { name, icon, color } = req.body;
		const category = await new Category({ name, icon, color }).save();
		if (!category) {
			throw new ValidationError();
		}
		res.send(category);
	} catch (error) {
		next(error);
	}
};

const updateCategory = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, color, icon } = req.body;
		if (isValidObjectId(id)) {
			const category = await Category.findByIdAndUpdate(
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
			if (!name || !color || !icon) {
				throw new ValidationError();
			}
			if (!category) {
				throw new NotFoundException("category");
			}
			res.status(200).json(category);
		} else {
			throw new InvalidObjectIDException();
		}
	} catch (err) {
		next(err);
	}
};

const deleteCategory = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (isValidObjectId(id)) {
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
			throw new InvalidObjectIDException();
		}
	} catch (error) {
		next(error);
	}
};
module.exports = {
	newCategory,
	deleteCategory,
	getListOfCategories,
	getCategory,
	updateCategory,
};
