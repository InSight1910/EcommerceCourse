const { isValidObjectId } = require("mongoose");

const { User } = require("../models/user.model");
const {
	InvalidObjectIDException,
	NotFoundException,
} = require("../helpers/errors");

const getUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (isValidObjectId(id)) {
			const user = await User.findById(id);
			if (!user) throw new NotFoundException("user", "ID");
			res.status(200).json(user);
		} else {
			throw new InvalidObjectIDException();
		}
	} catch (error) {
		next(error);
	}
};

const getCountUser = async (req, res) => {
	const userCount = await User.countDocuments((count) => count);
	res.status(200).json({ success: true, userCount });
};

module.exports = { getUser, getCountUser };
