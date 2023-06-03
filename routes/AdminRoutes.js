const { adminLogin, registerAdmin } = require("../controllers/AdminController");
// const protect = require("../Middlewares/authMiddleware");

const router = require("express").Router();

router.post("/register/", registerAdmin);
router.post("/login/", adminLogin);

module.exports = router;
