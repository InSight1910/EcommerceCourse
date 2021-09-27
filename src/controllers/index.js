const {
	newCategory,
	deleteCategory,
	getListOfCategories,
	getCategory,
	updateCategory,
} = require("./category.controller");

const {
	getProductList,
	getProduct,
	createProduct,
	deleteProduct,
	updateProduct,
	getProductCount,
	getProductFeature,
} = require("./product.controller.js");

module.exports = {
	categories: {
		newCategory,
		deleteCategory,
		getListOfCategories,
		getCategory,
		updateCategory,
	},
	products: {
		getProductList,
		getProduct,
		createProduct,
		deleteProduct,
		updateProduct,
		getProductCount,
		getProductFeature,
	},
};
