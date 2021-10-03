const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const productSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	richDescription: {
		type: String,
	},
	image: {
		type: String,
		default: "",
		required: true,
	},
	images: [
		{
			type: String,
			default: "",
			required: true,
		},
	],
	brand: {
		type: String,
		default: "Generic",
		required: true,
	},
	price: {
		type: Number,
		default: 0,
		required: true,
	},
	category: {
		type: ObjectId,
		ref: "Category",
	},
	countInStock: {
		type: Number,
		default: 0,
		min: 0,
		max: 256,
	},
	rating: {
		type: Number,
		default: 0,
		min: 0,
		max: 5,
	},
	numReviews: {
		type: Number,
		default: 0,
	},

	isFeatured: {
		type: Boolean,
		default: false,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

exports.Product = model("Product", productSchema);
