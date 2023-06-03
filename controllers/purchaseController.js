const { purchases, customerKhatas } = require("../models");

const createpurchase = async (req, res) => {
  //   if (!password || !email || !name) {
  //     return res.status(401).json({ error: "please enter values " });
  //   }

  // attributes: [
  //   [db.sequelize.literal("totalAmount-amount"), "totalAmounts"],
  // ],
  // include: [{ model: customerKhatas }],
  // where: { khata_id: req.params.id },

  try {
    const result = await purchases.create({
      products: req.body.products,
      amount: req.body.amount,
      khata_id: req.params.id,
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
const getAllpurchases = async (req, res) => {
  try {
    const result = await purchases.findAll();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
const getCustomerspurchases = async (req, res) => {
  try {
    const result = await purchases.findAll({
      where: { khata_id: req.params.id },
    });
    res.status(200).json({
      length: result.length,
      result,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
const deletepurchases = async (req, res) => {
  try {
    await purchases.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "purchase has deleted",
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const getPurchaseTotal = async (req, res) => {
  try {
    const result = await purchases.findAll({
      include: [{ model: customerKhatas }],
      // include: [{ model: customerKhatas, include: [payments] }],
      where: { khata_id: req.params.id },
      attributes: [
        [
          // db.sequelize.where(
          // db.sequelize.fn("SUM", db.sequelize.col("enterAmount")),
          // "-",
          // db.sequelize.col("customerKhatas.totalAmount")
          // ),

          db.sequelize.fn("SUM", db.sequelize.col("amount")),
          "totalAmount",
        ],
        // [db.sequelize.fn("SUM", db.sequelize.col("enterAmount")), "paidAmount"],
      ],

      // [db.sequelize.fn("SUM", db.sequelize.col("amount")), "total"],
      // group: ["customerKhata.id"],
      // raw: true,
    });
    console.log(result);
    await customerKhatas.update(
      {
        totalAmount: result[0].dataValues.totalAmount * 1,
        // paidAmount: result[0].dataValues.paidAmount * 1,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json({
      message: "data updated",
      totalAmount: result[0].dataValues.totalAmount * 1,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};

module.exports = {
  createpurchase,
  getAllpurchases,
  deletepurchases,
  getCustomerspurchases,
  getPurchaseTotal,
};
