const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");
const {
	isValidObjectId,
	Error: { ValidationError },
} = require("mongoose");
const {
	NotFileException,
	InvalidObjectIDException,
	NotFoundException,
} = require("../helpers/errors");

const getProductList = async (req, res, next) => {
	try {
		const { categories } = req.query;
		let filter = {};
		if (categories) {
			filter = { category: categories.split(";") };
		}
		const products = await Product.find(filter).populate("category");

		if (!products) throw new NotFoundException("product", "ID or filter");
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};
const getProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (isValidObjectId(id)) {
			const product = await Product.findById(id);
			if (!product) {
				throw new NotFoundException("product", "ID");
			}
			res.send(product);
		} else {
			throw new InvalidObjectIDException();
		}
	} catch (error) {
		next(error);
	}
};

const createProduct = async (req, res, next) => {
	try {
		const {
			name,
			description,
			richDescription,
			images,
			brand,
			price,
			category,
			countInStock,
			rating,
			numReviews,
			isFeatured,
		} = req.body;
		const file = req.file;
		if (!file) throw new NotFileException();
		const image = `${req.protocol}://${req.get("host")}/public/uploads/${
			req.file.filename
		}`;
		const categoryBD = await Category.findById(category);
		if (!categoryBD) throw new NotFoundException("category", "ID");

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
		}).save();
		if (!product) throw new ValidationError();
		res.status(200).json(product);
	} catch (err) {
		next(err);
	}
};
const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			name,
			description,
			richDescription,
			brand,
			price,
			category,
			countInStock,
			rating,
			numReviews,
			isFeatured,
		} = req.body;
		if (!isValidObjectId(id)) {
			if (category) {
				if (isValidObjectId(category)) {
					const categoryBD = await Category.findById(category);
					if (!categoryBD) {
						throw new NotFoundException("category", "ID");
					}
				} else {
					throw new InvalidObjectIDException("category");
				}
			}
			const product = await Product.findById(id);
			if (!product) throw new NotFoundException("product", "ID");

			const file = req.file;
			if (!file) throw new NotFileException();

			const image = `${req.protocol}://${req.get(
				"host"
			)}/public/uploads/${req.file.filename}`;
			const updatedProduct = await Product.findByIdAndUpdate(
				id,
				{
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
				},
				{ new: true }
			);
			res.status(200).json(updatedProduct);
		} else {
			throw new InvalidObjectIDException();
		}
	} catch (err) {
		next(err);
	}
};

const deleteProduct = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (isValidObjectId(id)) {
			const deletedProduct = await Product.findByIdAndDelete(id);
			if (!deletedProduct) throw new NotFoundException("product", "ID");
			res.status(200).json({
				success: true,
				message: "The category was deleted successfully",
			});
		} else {
			throw new InvalidObjectIDException();
		}
	} catch (error) {
		next(error);
	}
};

const getProductCount = async (req, res) => {
	const productCount = await Product.countDocuments((count) => count);
	res.status(200).json({ success: true, productCount });
};

const getProductFeature = async (req, res, next) => {
	try {
		const { limit } = req.query;
		const productsFeatured = await Product.find({ isFeatured: true })
			.limit(+limit || 0)
			.populate("category");
		if (productsFeatured.length == 0)
			throw new NotFoundException("product");
		res.status(200).json({ success: true, productsFeatured });
	} catch (error) {
		next(error);
	}
};

const updateGalleryProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) throw new InvalidObjectIDException();
		const files = req.files;
		let arrayImages;
		if (files)
			arrayImages = files.map(
				(file) =>
					`${req.protocol}://${req.get("host")}/public/uploads/${
						file.filename
					}`
			);
		const updatedGallery = await Product.findByIdAndUpdate(
			id,
			{ images: arrayImages },
			{ new: true }
		);
		if (!updatedGallery) throw new NotFoundException();
		res.status(200).json(updatedGallery);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getProductList,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductCount,
	getProductFeature,
	updateGalleryProduct,
};
