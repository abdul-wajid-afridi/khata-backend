// // products
// module.exports = (sequelize, DataTypes) => {
//   const products = sequelize.define("products", {
//     chasesNo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     engineNo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     enginePower: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     color: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     model: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     invoiceStatus: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     purchasePrice: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     sellingPrice: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     receivingData: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   });

//   products.associate = (models, DataTypes) => {
//     products.hasMany(models.productSales, {
//       onDelete: "cascade",
//       foreignKey: "engineNo",
//     });
//     models.productSales.belongsTo(products, {
//       onDelete: "cascade",
//       foreignKey: "engineNo",
//     });
//   };
//   return products;
// };

// // sales products
// module.exports = (sequelize, DataTypes) => {
//   const productSales = sequelize.define("productSales", {
//     pageNo: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//     },
//     customerName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     fatherName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     cnicNo: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//     },
//     phoneNo1: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//     },
//     phoneNo2: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//     },
//     customerOccupation: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     customerPic: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     guarantorName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     guarantorFatherName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     guarantorAddress: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     guarantorCnicNo: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//     },
//     guarantorPhoneNo1: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//     },
//     guarantorPhoneNo2: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//     },
//     guarantorOccupation: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     relationShip: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     guarantorPic: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     selectProduct: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     chasesNo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     invoiceStatus: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     salePrice: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     advancePayment: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     monthlyInstallments: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     dateOfSale: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//   });
//   productSales.associate = (models, DataTypes) => {
//     productSales.hasMany(models.payments, {
//       onDelete: "cascade",
//       foreignKey: "payments_id",
//     });
//     models.payments.belongsTo(productSales, {
//       onDelete: "cascade",
//       foreignKey: "payments_id",
//     });
//   };

//   return productSales;
// };
// // payments
// module.exports = (sequelize, DataTypes) => {
//   const payments = sequelize.define("payments", {
//     totalAmount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     paidAmount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     remainingAmount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     enterAmount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     receiptNo: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   });
//   return payments;
// };
