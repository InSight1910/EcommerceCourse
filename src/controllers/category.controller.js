const { Category } = require("../models/category");

const newCategory = async (req, res) => {
	const { name, icon, color } = req.body;
	const category = new Category({ name, icon, color }, { versionKey: false });

	category = await category.save();

	!category
		? res.status(404).send("The category cannot be created!")
		: res.send(category);
};

module.exports = { newCategory };
