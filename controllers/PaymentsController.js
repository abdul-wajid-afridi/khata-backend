const { payments, customerKhatas } = require("../models");
const db = require("../models");

const createPayments = async (req, res) => {
  const { totalAmount, paidAmount, remainingAmount, enterAmount } = req.body;
  try {
    const result = await payments.create({
      totalAmount,
      paidAmount,
      remainingAmount,
      enterAmount,
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

const getAllPayments = async (req, res) => {
  try {
    const result = await payments.findAll();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
const getCustomersPayments = async (req, res) => {
  try {
    const result = await payments.findAll({
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
const deletePayments = async (req, res) => {
  try {
    await payments.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "payments has deleted",
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const getCustomerTotal = async (req, res) => {
  try {
    const result = await payments.findAll({
      include: [{ model: customerKhatas }],
      where: { khata_id: req.params.id },
      attributes: [
        [
          //       // db.sequelize.where(
          //       // db.sequelize.fn("SUM", db.sequelize.col("enterAmount")),
          //       // "-",
          //       // db.sequelize.col("customerKhatas.totalAmount")
          //       // ),

          db.sequelize.fn("SUM", db.sequelize.col("enterAmount")),
          "paidAmount",
        ],
      ],
    });
    await customerKhatas.update(
      {
        paidAmount: result[0].dataValues.paidAmount * 1,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json({
      message: "data updated",
      paidAmount: result[0].dataValues.paidAmount * 1,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};

const lastPayment = async (req, res) => {
  try {
    const result = await payments.findAll({
      where: { khata_id: req.params.id },
    });
    const lastInd = result.length;
    const secLastInd = lastInd - 1;
    res.status(200).json({
      data: result.slice(secLastInd, lastInd).map((it) => it),
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
module.exports = {
  createPayments,
  deletePayments,
  getAllPayments,
  getCustomersPayments,
  getCustomerTotal,
  lastPayment,
};
