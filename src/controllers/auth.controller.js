const { User } = require("../models/user.model");
const { Auth } = require("../models/auth.model");

const signUp = async (req, res) => {
	const {
		name,
		email,
		password,
		phone,
		isAdmin,
		street,
		apartment,
		zip,
		city,
		country,
	} = req.body;
	const user = await new User({
		name,
		email,
		phone,
		isAdmin,
		street,
		apartment,
		zip,
		city,
		country,
	}).save();
	const auth = await new Auth({
		email,
		password,
	});
	await auth.encryptPassword();
	auth.save();

	if (!user) return res.status(500).send("the user cannot be created!");

	res.send(user);
};
const login = async (req, res) => {
	const { email, password } = req.body;
	const secretKey = process.env.SECRET_KEY;
	const user = await User.findOne({ email });
	if (!user)
		return res.status(404).json({
			success: false,
			message: "The user cannot be find. Try again with another email.",
		});
	if (await user.comparePassword(password)) {
		const token = sign(
			{ userID: user.id, isAdmin: user.isAdmin },
			secretKey,
			{ expiresIn: "4h" }
		);
		res.status(200).json({ user: user.email, token });
	} else {
		res.status(401).json({
			success: false,
			message: "Wrong password. Try again with another password",
		});
	}
};

module.exports = {
	signUp,
	login,
};
