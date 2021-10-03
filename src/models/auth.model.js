const { Schema, model } = require("mongoose");
const { genSalt, hash, compare } = require("bcrypt");
const authSchema = Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
});

authSchema.methods.encryptPassword = async function () {
	const salt = await genSalt();
	console.log(this.password);
	this.password = await hash(this.password, salt);
};
authSchema.methods.comparePassword = async function (password) {
	return await compare(password, this.password);
};

exports.Auth = model("Auth", authSchema);
