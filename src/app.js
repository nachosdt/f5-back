const express = require("express");
const cors = require("cors");

const ProductsRoutes = require("./routes/products.routes");

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(ProductsRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: "Endpoint not found" });
});

function errorHandling(err, req, res, next) {
    res.status(500).json({ message: err.message });
}

app.use(errorHandling);

module.exports = app;
