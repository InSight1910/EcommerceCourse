const NotFoundException = function (model = "", identifier = "") {
	messageError = `The ${model} cannot be find.`;
	if (identifier) messageError += ` Try again with another ${identifier}.`;
	this.name = "NotFoundException";
	this.message = {
		success: false,
		message: messageError,
	};
	this.status = 404;
};

NotFoundException.prototype = Error.prototype;

const ExtensionFileWrongException = function (extension) {
	this.name = "InvalidExtensionError";
	this.message = {
		success: false,
		message: `The following extension: ${extension} is not valid. We only accept JPG, JPEG, PNG.`,
	};
	this.status = 400;
};
ExtensionFileWrongException.prototype = Error.prototype;

const NotFileException = function () {
	this.name = "NotFileException";
	this.message = {
		success: false,
		message: `We cannot find any image. Pls upload a image with the following extensions: PNG, JPG, JPEG.`,
	};
	this.status = 400;
};
NotFileException.prototype = Error.prototype;

const InvalidObjectIDException = function (model = "") {
	this.name = "InvalidObjectIDException";
	this.message = {
		success: false,
		message: `The ${
			model + " "
		}ID that you provide is not valid, Try again with a valid ID.`,
	};
	this.status = 400;
};
InvalidObjectIDException.prototype = Error.prototype;

const InvalidCredentialsException = function () {
	this.name = "InvalidCredentialException";
	this.message =
		"Wrong email or password. Try again with another email or password";
	this.status = 401;
};

module.exports = {
	NotFoundException,
	ExtensionFileWrongException,
	NotFileException,
	InvalidObjectIDException,
	InvalidCredentialsException,
};
