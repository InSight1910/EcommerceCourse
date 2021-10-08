const e = require("cors");
const {
	isValidObjectId,
	Error: { ValidationError },
} = require("mongoose");
const {
	NotFoundException,
	InvalidObjectIDException,
} = require("../helpers/errors");
const { Order } = require("../models/order.model");
const { OrderItem } = require("../models/orderItem.model");
const { User } = require("../models/user.model");

const getOrders = async (req, res, next) => {
	try {
		const orderList = await Order.find()
			.populate("user", "name")
			.populate({
				path: "orderItems",
				populate: { path: "product", populate: "category" },
			});
		res.send(orderList);
	} catch (error) {
		next(error);
	}
};

const getOrderByID = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (isValidObjectId(id)) {
			const orderList = await Order.findById(id)
				.populate("user", "name")
				.populate({
					path: "orderItems",
					populate: { path: "product", populate: "category" },
				});
			if (!orderList) throw new NotFoundException("order", "ID");

			res.send(orderList);
		} else throw new InvalidObjectIDException();
	} catch (error) {
		next(error);
	}
};
const getOrderByUserID = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (isValidObjectId(id)) {
			const orderListUser = await Order.findByUserID(id)
				.populate("user", "name")
				.populate({
					path: "orderItems",
					populate: { path: "product", populate: "category" },
				});
			if (orderListUser.length == 0)
				throw new NotFoundException("orders", "user ID.");

			res.send(orderListUser);
		} else throw new InvalidObjectIDException();
	} catch (err) {
		next(err);
	}
};

const getTotalSales = async (req, res) => {
	const totalSales = await Order.aggregate([
		{
			$group: { _id: null, totalPrice: { $sum: "$totalPrice" } },
		},
	]).sort({ dateOrdered: -1 });
	res.status(200).json({ totalSales: totalSales[0].totalPrice });
};

const createOrder = async (req, res, next) => {
	try {
		const { orderItems, shipingAddress, city, zip, country, phone, user } =
			req.body;

		const orderItemList = await Promise.all(
			orderItems.map(async (item) => {
				const orderItem = await new OrderItem({
					...item,
				}).save();
				if (!orderItem) throw new ValidationError();
				return orderItem._id;
			})
		);
		const userDB = await User.findById(user);
		if (!userDB) throw new NotFoundException("user", "user ID");
		let totalPrice = await Promise.all(
			orderItemList.map(async (item) => {
				const productPrice = await OrderItem.findById(item).populate(
					"product",
					"price"
				);
				if (productPrice.length == 0)
					throw new NotFoundException("order item", "ID");
				const totalPriceProduct =
					productPrice.product.price * productPrice.quantity;
				return totalPriceProduct;
			})
		);
		totalPrice = totalPrice.reduce((x, y) => x + y, 0);
		const order = await new Order({
			orderItems: orderItemList,
			shipingAddress,
			city,
			zip,
			country,
			phone,
			status,
			totalPrice,
			user: userDB,
		}).save();

		if (!order) throw new ValidationError();
		res.status(200).json(order);
	} catch (error) {}
};

const updateOrderStatus = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const updatedOrder = await Order.findByIdAndUpdate(
			id,
			{
				status,
			},
			{ new: true }
		);
		if (!updatedOrder) {
			throw new NotFoundException("order", "ID");
		}
		res.send(updatedOrder);
	} catch (error) {
		next(error);
	}
};

const deleteOrderByID = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedOrder = await Order.findByIdAndDelete(id);
		if (!deletedOrder) {
			throw new NotFoundException("order", "ID");
		}
		deletedOrder.orderItems.map(async (item) => {
			const orderitem = await OrderItem.findByIdAndDelete(item);
			if (!orderitem) throw new NotFoundException("order", "ID");
		});
		res.status(200).json({
			success: true,
			message: "The order was deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createOrder,
	getOrders,
	getOrderByID,
	updateOrderStatus,
	deleteOrderByID,
	getTotalSales,
	getOrderByUserID,
};
