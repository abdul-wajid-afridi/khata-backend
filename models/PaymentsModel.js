module.exports = (sequelize, DataTypes) => {
  const payments = sequelize.define("payments", {
    // totalAmount: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // paidAmount: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // remainingAmount: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    enterAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return payments;
};
