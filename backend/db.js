const { Sequelize } = require("sequelize");
const patchSequelizeModels = require("./autoPlainSequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

patchSequelizeModels();

module.exports = sequelize;
