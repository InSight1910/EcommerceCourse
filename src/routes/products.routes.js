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

const uploadOptions = require("../utils/multerConfig");

router.get(`/`, getProductList);
router.get(`/:id`, getProduct);
router.get(`/get/count`, getProductCount);
router.get(`/get/featured`, getProductFeature);

router.post(`/`, uploadOptions.single("image"), createProduct);

router.put(`/:id`, updateProduct);
router.put(`/updateGalerry`, updateProduct);

router.delete(`/`, deleteProduct);
module.exports = router;
