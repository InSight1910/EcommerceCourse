const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const orderSchema = Schema({
	orderItems: [
		{
			type: ObjectId,
			ref: "OrderItem",
		},
	],
	shipingAddress: { type: String, required: true },
	city: {
		type: String,
		required: true,
	},
	zip: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	status: {
		type: String,
		default: "Pending",
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	user: {
		type: ObjectId,
		ref: "User",
		required: true,
	},
	dateOrdered: {
		type: Date,
		default: Date.now,
	},
});

orderSchema.statics.findByUserID = function (userID) {
	return this.find({ user: userID }) || undefined;
};
exports.Order = model("Order", orderSchema);
