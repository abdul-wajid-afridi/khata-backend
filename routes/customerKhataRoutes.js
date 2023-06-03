const {
  createCustomerKhata,
  getAllCustomerKhata,
  deletecutomerKhata,
  getPurchaseTotal,
  getRemainingAmount,
  getCustomerKhata,
  getJoints,
  updateCustomerKhata,
  searchCustomerKhata,
} = require("../controllers/customerKhataController");
const protect = require("../middlewares/AuthMiddleware");
const upload = require("../utils/UploadFiles");

const router = require("express").Router();

router.post("/khata/", protect, upload.single("image"), createCustomerKhata);
router.put("/khata/:id", protect, upload.single("image"), updateCustomerKhata);
router.get("/khata/:id", protect, getCustomerKhata);
router.put("/remainkhata/:id", protect, getRemainingAmount);
router.put("/totalkhata/:id", protect, getPurchaseTotal);
router.get("/joinkhata/", protect, getJoints);
router.get("/khata/", getAllCustomerKhata);
router.delete("/khata/:id", protect, deletecutomerKhata);
// search khata
router.get("/searchkhata/", searchCustomerKhata);

module.exports = router;
