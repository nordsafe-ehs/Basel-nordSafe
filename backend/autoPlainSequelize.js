const { Model } = require("sequelize");

function toPlain(data) {
  if (!data) return null;
  if (Array.isArray(data)) return data.map((item) => item && item.toJSON());
  if (typeof data.toJSON === "function") return data.toJSON();
  return data;
}

function patchSequelizeModels() {
  const methods = ["findAll", "findOne", "findByPk"];

  for (const method of methods) {
    const original = Model[method];

    Model[method] = async function (...args) {
      const result = await original.apply(this, args);
      return toPlain(result);
    };
  }
}

module.exports = patchSequelizeModels;
