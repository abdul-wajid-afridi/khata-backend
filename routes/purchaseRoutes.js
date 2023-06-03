const {
  createpurchase,
  getAllpurchases,
  deletepurchases,
  getCustomerspurchases,
  getPurchaseTotal,
} = require("../controllers/purchaseController");
const protect = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/purchase/:id", protect, createpurchase);
router.get("/purchase/", protect, getAllpurchases);
router.put("/totalkhata/:id", protect, getPurchaseTotal);
router.get("/purchase/:id", protect, getCustomerspurchases);
router.delete("/purchase/:id", protect, deletepurchases);

module.exports = router;
