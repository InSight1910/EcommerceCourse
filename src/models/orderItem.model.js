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
	},
});

exports.OrderItem = model("OrderItem", orderItemSchema);
