const { Router } = require("express");
const productCtlr = require("../controllers/products.controller");

const router = Router();

router.get("/product", productCtlr.getProducts);
router.put("/product", productCtlr.putProduct);
router.delete("/product", productCtlr.deleteProduct);

module.exports = router;
