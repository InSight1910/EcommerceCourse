const {
	Error: { ValidationError },
} = require("mongoose");

const { User } = require("../models/user.model");
const { Auth } = require("../models/auth.model");
const {
	InvalidCredentialsException,
	NotFoundException,
} = require("../helpers/errors");

const signUp = async (req, res, next) => {
	try {
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

		if (!user) throw new ValidationError();
		if (!auth) throw new ValidationError();

		res.send(user);
	} catch (error) {
		next(error);
	}
};
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const secretKey = process.env.SECRET_KEY;
		const user = await User.findOne({ email });
		if (!user) throw new NotFoundException("user", "email");
		if (await user.comparePassword(password)) {
			const token = sign(
				{ userID: user.id, isAdmin: user.isAdmin },
				secretKey,
				{ expiresIn: "4h" }
			);
			res.status(200).json({ user: user.email, token });
		} else {
			throw new InvalidCredentialsException();
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	signUp,
	login,
};
