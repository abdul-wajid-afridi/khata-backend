const db = require("../models");
const { customerKhatas, purchases, payments } = require("../models");

const createCustomerKhata = async (req, res) => {
  //   if (!password || !email || !name) {
  //     return res.status(401).json({ error: "please enter values " });
  //   }
  const {
    customerName,
    fatherName,
    address,
    cnicNo,
    phoneNo1,
    phoneNo2,
    customerOccupation,
    totalAmount,
    paidAmount,
    remainingAmount,
  } = req.body;
  console.log(req.file);
  try {
    const result = await customerKhatas.create({
      customerName,
      fatherName,
      address,
      cnicNo,
      phoneNo1,
      phoneNo2,
      customerOccupation,
      customerPic: req.file.filename,
      totalAmount,
      paidAmount,
      remainingAmount,
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

// update khata

const updateCustomerKhata = async (req, res) => {
  //   if (!password || !email || !name) {
  //     return res.status(401).json({ error: "please enter values " });
  //   }

  const {
    customerName,
    fatherName,
    address,
    cnicNo,
    phoneNo1,
    phoneNo2,
    customerOccupation,
    totalAmount,
    paidAmount,
    remainingAmount,
  } = req.body;
  try {
    const result = await customerKhatas.update(
      {
        customerName,
        fatherName,
        address,
        cnicNo,
        phoneNo1,
        phoneNo2,
        customerOccupation,
        customerPic: req.file.filename,
        totalAmount,
        paidAmount,
        remainingAmount,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
// get all data of customer
const getAllCustomerKhata = async (req, res) => {
  try {
    const result = await customerKhatas.findAll();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
const getCustomerKhata = async (req, res) => {
  try {
    const result = await customerKhatas.findOne({
      where: { id: req.params.id },
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
const searchCustomerKhata = async (req, res) => {
  try {
    const result = await customerKhatas.findOne({
      where: { cnicNo: req.params.id },
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

// where:{
// [Op.like]: '%hat',                       // LIKE '%hat'
// [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
// update the total
// }

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
    await customerKhatas.update(
      {
        totalAmount: result[0].dataValues.totalAmount * 1,
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

const getRemainingAmount = async (req, res) => {
  try {
    const result = await customerKhatas.findOne({
      where: { id: req.params.id },
      attributes: [
        [
          db.sequelize.where(
            db.sequelize.col("totalAmount"),
            "-",
            db.sequelize.col("paidAmount")
          ),
          "remainingAmount",
          // db.sequelize.fn("SUM", db.sequelize.col("amount")),
          // "totalAmount",
        ],
        // [db.sequelize.fn("SUM", db.sequelize.col("enterAmount")), "paidAmount"],
      ],

      // [db.sequelize.fn("SUM", db.sequelize.col("amount")), "total"],
      // group: ["customerKhata.id"],
      // raw: true,
    });
    await customerKhatas.update(
      {
        remainingAmount: result.dataValues.remainingAmount * 1,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json({
      message: "data updated",
      remainingAmount: result.dataValues.remainingAmount * 1,
    });
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};
// const getCustomerTotal = async (req, res) => {
//   try {
//     const result = await purchases.findAll({
//       include: [{ model: customerKhatas }],
//       where: { khata_id: req.params.id },
//       attributes: [
//         [
//           // db.sequelize.where(
//           // db.sequelize.fn("SUM", db.sequelize.col("amount"))
//           // "+",
//           // db.sequelize.col("totalAmount")
//           // ),
//           db.sequelize.fn("SUM", db.sequelize.col("amount")),
//           "totalAmount",
//         ],
//       ],

//       // [db.sequelize.fn("SUM", db.sequelize.col("amount")), "total"],
//       // group: ["customerKhata.id"],
//       // raw: true,
//     });

//     await customerKhatas.update(
//       {
//         totalAmount: result[0].dataValues.totalAmount * 1,
//       },
//       {
//         where: { id: req.params.id },
//       }
//     );
//     // const newdata = result.map((it) => it.customerKhata.totalAmount);

//     // const newdata = result.map((t) => t.update({ totalAmount: t.totalAmount }));
//     // console.log(result[0].dataValues.totalAmount);
//     // console.log(result.dataValues.totalAmount);
//     res.status(200).json({
//       message: "data updated",
//       totalAmount: result[0].dataValues.totalAmount * 1,
//     });
//   } catch (error) {
//     res.status(401).json({
//       error: error,
//     });
//   }
// };

const deletecutomerKhata = async (req, res) => {
  try {
    await customerKhatas.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "product has deleted",
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const getJoints = async (req, res) => {
  let tot;
  try {
    const result = await customerKhatas.findAll({
      attributes: [
        [
          "customerName",
          "totalAmount",
          "fatherName",
          [
            db.sequelize.literal(
              "(SUM(purchases.amount), 0) - (COUNT(purchases.id), 0)"
            ),
            "balance",
          ],
          // db.sequelize.col("amount"),
          // db.sequelize.literal("amount"),
          // "total_amount",
        ],
        // [
        //   sequelize.fn(
        //     "SUM",
        //     (sequelize.fn("COALESCE", sequelize.col("base_income"), 0),
        //     sequelize.literal("+"),
        //     sequelize.fn("COALESCE", sequelize.col("user_taxes"), 0))
        //   ),
        //   "total_sal",
        // ],
      ],
      include: [
        {
          model: purchases,
          attributes: ["products", "amount"],
        },
      ],
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
// const getJoints = async (req, res) => {
//   try {
//     const result = await customerKhatas.findAll({
//       attributes: ["customerName", "address"],
//       include: [{ model: purchases, attributes: ["products", "amount"] }],
// [sequelize.literal(`(select sum(columnA) from table where date = '2021-01-05')`), 'testSum'],
//     });
//     res.status(200).json({
//       result,
//     });
//   } catch (error) {
//     res.status(401).json({
//       error: error.message,
//     });
//   }
// };

module.exports = {
  createCustomerKhata,
  getAllCustomerKhata,
  updateCustomerKhata,
  deletecutomerKhata,
  getPurchaseTotal,
  getJoints,
  getCustomerKhata,
  getRemainingAmount,
  searchCustomerKhata,
};
