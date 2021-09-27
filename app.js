const express = require("express");
const app = express();
const morgan = require("morgan");

const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));

//Routes
const categoriesRoutes = require("./src/routes/categories.routes");
const productsRoutes = require("./src/routes/products.routes");
const usersRoutes = require("./src/routes/users.routes");
const ordersRoutes = require("./src/routes/orders.routes");

const api = process.env.API_URl;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
require("./src/utils/db");

//Server
app.listen(3000, () => {
	console.log("server is running http://localhost:3000");
});
