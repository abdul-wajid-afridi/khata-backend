const { verify } = require("jsonwebtoken");

const protect = (req, res, next) => {
  // const accessToken = req.header("accessToken");
  const token = req.cookies.token;
  // const token = req.headers.authorization || req.headers.Authorization;
  if (!token) res.json({ error: "user not logged in" });
  try {
    // req.user = token;
    const validToken = verify(token, "importantMessage");
    req.user = validToken;
    if (validToken) {
      next();
    }
  } catch (error) {
    res.json({
      error: "no token authorised error",
    });
  }
};
module.exports = protect;
