function NotFoundException(model = "", identifier = "") {
	this.name = "NotFoundException";
	this.message = {
		success: false,
		message: `The ${model} cannot be find. Try again with another ${identifier}`,
	};
	this.status = 404;
}
NotFoundException.prototype = Error.prototype;
module.exports = { NotFoundException };
