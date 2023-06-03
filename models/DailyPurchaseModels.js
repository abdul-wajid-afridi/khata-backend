module.exports = (sequelize, DataTypes) => {
  const purchases = sequelize.define("purchases", {
    products: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return purchases;
};
