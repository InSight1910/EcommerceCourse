const mongoose = require("mongoose");

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: "eshop-course",
	})
	.then(() => {
		console.log("Database Connection is ready...");
	})
	.catch((err) => {
		console.log(err);
	});
