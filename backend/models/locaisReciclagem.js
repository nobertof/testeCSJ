"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Pessoas.init(
    {
      
      nome: DataTypes.STRING,
      ativo: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LocaisReciclagem",
    }
  );
  return Pessoas;
};