const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Companies = sequelize.define("Companies", {
  name: {
    type: DataTypes.TEXT,
  },
  monthlySDSSearchUsage: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  monthlySDSSaveUsage: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastUsageUpdate: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  country: {
    type: DataTypes.ENUM,
    values: ["NO", "DK", "FI", "SE", "US", "GB", "AE"],
  },
  orgNumber: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  address1: {
    type: DataTypes.STRING,
  },
  address2: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  zipCode: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  subscriptionEndsAt: {
    type: DataTypes.DATE,
    defaultValue: () => {
      const now = new Date();
      now.setMonth(now.getMonth() + 1);
      return now;
    },
  },
  subscriptionType: {
    type: DataTypes.ENUM,
    defaultValue: "free trial",
    values: ["free trial", "plan"],
  },
});

module.exports = Companies;
