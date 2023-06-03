module.exports = (sequelize, DataTypes) => {
  const customerKhatas = sequelize.define("customerKhatas", {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnicNo: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
    },
    phoneNo1: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    phoneNo2: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    customerOccupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerPic: {
      type: DataTypes.STRING,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paidAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remainingAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  customerKhatas.associate = (models, DataTypes) => {
    customerKhatas.hasMany(models.payments, {
      onDelete: "cascade",
      foreignKey: "khata_id",
    });
    models.payments.belongsTo(customerKhatas, {
      onDelete: "cascade",
      foreignKey: "khata_id",
    });

    customerKhatas.hasMany(models.purchases, {
      onDelete: "cascade",
      foreignKey: "khata_id",
    });
    models.purchases.belongsTo(customerKhatas, {
      onDelete: "cascade",
      foreignKey: "khata_id",
    });
  };

  return customerKhatas;
};
