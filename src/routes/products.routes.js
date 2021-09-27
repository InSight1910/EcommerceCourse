const express = require("express");
const router = express.Router();

const {
	products: {
		getProductList,
		getProduct,
		getProductCount,
		getProductFeature,
		createProduct,
		updateProduct,
		deleteProduct,
	},
} = require("../controllers");

router.get(`/`, getProductList);
router.get(`/:id`, getProduct);
router.get(`/get/count`, getProductCount);
router.get(`/get/featured`, getProductFeature);

router.post(`/`, createProduct);

router.put(`/`, updateProduct);

router.delete(`/`, deleteProduct);
module.exports = router;
