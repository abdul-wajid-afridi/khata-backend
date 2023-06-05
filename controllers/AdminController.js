const { admins } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
  const { password, email, name } = req.body;
  if (!password || !email || !name) {
    return res
      .status(401)
      .json({ error: "please enter values to registerUser" });
  }
  const userExists = await admins.findOne({
    where: { email: email },
  });
  if (userExists) {
    return res.status(401).json({ error: "user already exists" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await admins.create({
      password: hashPassword,
      name,
      email,
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(401).json({
      error: "user register error",
    });
  }
};

const adminLogin = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await admins.findOne({ where: { name: name } });
    if (!user) return res.status(401).json({ error: "user doesnot exists" });

    await bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.status(401).json({ error: "no Password matched" });

      const token = sign({ name: user.name, id: user.id }, "importantMessage");
      res.cookie("token", token, {
        withCredentials: true,
        HttpOnly: false,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token, user });
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = {
  adminLogin,
  registerAdmin,
};
