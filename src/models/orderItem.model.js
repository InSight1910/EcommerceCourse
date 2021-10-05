const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const orderItemSchema = Schema({
	product: {
		type: ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: 1,
	},
});

exports.OrderItem = model("OrderItem", orderItemSchema);
