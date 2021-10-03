const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");
const { isValidObjectId } = require("mongoose");

const getProductList = async (req, res) => {
	const { categories } = req.query;
	let filter = {};
	if (categories) {
		filter = { category: categories.split(";") };
	}
	const products = await Product.find(filter).populate("category");

	products
		? res.status(200).json(products)
		: res.status(404).json({
				success: false,
				message:
					"We cannot find any product with the category that you give us.",
		  });
};
const getProduct = async (req, res) => {
	const { id } = req.params;

	if (!isValidObjectId(id)) {
		const product = await Product.findById(id);
		if (!product) {
			res.status(404).json({
				success: false,
				message:
					"The product cannot be found. Please try again with other ID.",
			});
		}
		res.send(product);
	} else {
		res.status(500).json({
			success: false,
			message:
				"The ID that you provide isn't valid. Please try with an objectID valid. ",
		});
	}
};

const createProduct = async (req, res) => {
	const {
		name,
		description,
		richDescription,
		image,
		images,
		brand,
		price,
		category,
		countInStock,
		rating,
		numReviews,
		isFeatured,
		dateCreated,
	} = req.body;

	const categoryBD = await Category.findById(category);
	!categoryBD &&
		res.status(400).json({
			success: false,
			message:
				"The category that you provide doesn't exist. Try with a category that exist.",
		});

	const product = await new Product({
		name,
		description,
		richDescription,
		image,
		images,
		brand,
		price,
		category,
		countInStock,
		rating,
		numReviews,
		isFeatured,
		dateCreated,
	}).save();
	product
		? res.status(200).json(product)
		: res.status(500).json({
				success: false,
				message: "The product cannot be created",
		  });
};
const updateProduct = async (req, res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		const product = await Product.findByIdAndUpdate(
			id,
			{
				$set: { ...req.body },
			},
			{ new: true }
		);
		product
			? res.status(200).json(product)
			: res.status(404).json({
					success: false,
					message: "The product dont exist. Try again with other ID",
			  });
	} else {
		res.status(500).json({
			success: false,
			message:
				"The ID that you provide isn't valid. Please try with an objectID valid. ",
		});
	}
};

const deleteProduct = async (req, res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		const deletedProduct = await Product.findByIdAndDelete(id);
		deletedProduct
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

const getProductCount = async (req, res) => {
	const productCount = await Product.countDocuments((count) => count);
	if (!productCount)
		return res.status(500).json({
			success: false,
			message: "There was a problem counting the products",
		});
	res.status(200).json({ success: true, productCount });
};

const getProductFeature = async (req, res) => {
	const { count } = req.query;
	const productsFeatured = await Product.find({ isFeatured: true })
		.limit(+count || 0)
		.populate("category");
	if (!productsFeatured)
		return res.status(500).json({
			success: false,
			message: "We don't have any product featured now",
		});
	res.status(200).json({ success: true, productsFeatured });
};

module.exports = {
	getProductList,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductCount,
	getProductFeature,
};
