const { isValidObjectId } = require("mongoose");
const { sign } = require("jsonwebtoken");

const { User } = require("../models/user.model");

const getUser = async (req, res) => {
	const { id } = req.params;
	if (isValidObjectId(id)) {
		const user = await User.findById(id);
		user
			? res.status(200).json(user)
			: res.status(404).json({
					success: false,
					message:
						"The user cannot be find. Try again with another ID.",
			  });
	} else {
		res.status(500).json({
			success: false,
			message:
				"The id that was provided is not valid. Try again with a valid ID.",
		});
	}
};

const getCountUser = async (req, res) => {
	const userCount = await User.countDocuments((count) => count);
	if (!userCount)
		return res.status(500).json({
			success: false,
			message: "There was a problem counting the users",
		});
	res.status(200).json({ success: true, userCount });
};

module.exports = { getUser, getCountUser };
