function errorHandler(err, req, res, next) {
	console.log(err);
	if (err.name === "UnauthorizedError") {
		// jwt authentication error
		return res.status(401).json({ message: "The user is not authorized" });
	}

	if (err.name === "ValidationError") {
		//  validation error
		return res.status(401).json({ message: err });
	}

	if (err.name === "NotFoundException") {
		return res.status(err.status).json({ ...err.message });
	}
	// default to 500 server error
	return res.status(500).json(err);
}

module.exports = errorHandler;
