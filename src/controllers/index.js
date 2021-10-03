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

const { getUser, getCountUser } = require("./users.controller");

const { signUp, login } = require("./auth.controller");

const {
	createOrder,
	getOrders,
	getOrderByID,
	updateOrderStatus,
	deleteOrderByID,
	getTotalSales,
	getOrderByUserID,
} = require("./order.controller");

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
	users: {
		getUser,
	},
	auth: {
		signUp,
		login,
	},
	order: {
		createOrder,
		getOrders,
		getOrderByID,
		updateOrderStatus,
		deleteOrderByID,
		getTotalSales,
		getOrderByUserID,
	},
};
