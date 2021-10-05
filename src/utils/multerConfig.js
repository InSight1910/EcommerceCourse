const multer = require("multer");
const mime = require("mime");
const { ExtensionFileWrongException } = require("../helpers/errors");

const FILE_TYPE_ALLOWED = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

// Multer config
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const isValidExtension = FILE_TYPE_ALLOWED[file.mimetype];
		let uploadError = new ExtensionFileWrongException(
			mime.getExtension(file.mimetype)
		);
		if (isValidExtension) {
			uploadError = null;
		}
		cb(uploadError, "public/uploads");
	},
	filename: (req, file, cb) => {
		const filename =
			file.originalname.replace(" ", "_").split(".")[0] +
			"-" +
			Date.now();
		cb(null, `${filename}.${FILE_TYPE_ALLOWED[file.mimetype]}`);
	},
});
const uploadOptions = multer({ storage });

module.exports = uploadOptions;
