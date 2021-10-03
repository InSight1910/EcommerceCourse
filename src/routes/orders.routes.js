const express = require("express");
const {
	order: {
		createOrder,
		getOrders,
		getOrderByID,
		updateOrderStatus,
		deleteOrderByID,
		getTotalSales,
		getOrderByUserID,
	},
} = require("../controllers");

const router = express.Router();

router.get(`/`, getOrders);
router.get(`/:id`, getOrderByID);
router.get(`/get/totalSales`, getTotalSales);
router.get(`/get/userOrders/:id`, getOrderByUserID);
router.post(`/`, createOrder);
router.put(`/:id`, updateOrderStatus);
router.delete(`/:id`, deleteOrderByID);
module.exports = router;
