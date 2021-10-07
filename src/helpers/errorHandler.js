function errorHandler(err, req, res, next) {
	if (err.name === "UnauthorizedError") {
		// jwt authentication error
		return res.status(401).json({ message: "The user is not authorized" });
	}

	if (err.name === "ValidationError") {
		const keys = Object.keys(err.errors);
		newMessage = "The following data is required: ";
		keys.forEach((item, index) => {
			newMessage += err.errors[item].path;

			if (index != keys.length - 1) {
				newMessage += ", ";
			} else {
				newMessage += ".";
			}
		});
		return res.status(400).json({ success: false, message: newMessage });
	}

	if (err.name === "NotFoundException")
		return res.status(err.status).json({ ...err.message });

	if (err.name === "NotFileException")
		return res.status(err.status).json({ ...err.message });

	if (err.name === "InvalidObjectIDException")
		return res.status(err.status).json({ ...err.message });

	if (err.name === "InvalidCredentialException")
		return res.status(err.status).json({ ...err.message });

	// default to 500 server error
	return res.status(500).json(err.message);
}

module.exports = errorHandler;
