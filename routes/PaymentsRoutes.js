const {
  createPayments,
  deletePayments,
  getAllPayments,
  getCustomersPayments,
  getCustomerTotal,
  lastPayment,
} = require("../controllers/PaymentsController");
const protect = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/payments/:id", protect, createPayments);
router.put("/payments/:id", protect, getCustomerTotal);
router.get("/payments/", protect, getAllPayments);
router.get("/payments/:id", protect, getCustomersPayments);
router.delete("/payments/:id", protect, deletePayments);
router.get("/lastpayments/:id", protect, lastPayment);

module.exports = router;
