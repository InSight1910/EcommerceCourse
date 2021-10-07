const express = require("express");
const cors = require("cors");
const { authJWT, errorHandler } = require("./src/helpers");
require("dotenv/config");
const app = express();

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(authJWT());

const categoriesRoute = require("./src/routes/categories.routes");
const productsRoute = require("./src/routes/products.routes");
const userRoute = require("./src/routes/users.routes");
const orderRoute = require("./src/routes/orders.routes");
const authRoute = require("./src/routes/auth.routes");

const api = process.env.API_URl;

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/products`, productsRoute);
app.use(`${api}/users`, userRoute);
app.use(`${api}/orders`, orderRoute);
app.use(`${api}/auth`, authRoute);

// Error handler middleware
app.use(errorHandler);
//Database
require("./src/utils/db");

//Server
app.listen(3000, () => {
	console.log("server running");
});
