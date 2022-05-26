"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class LocaisReciclagem extends Model {

        static associate(models) {

        }
    }
    LocaisReciclagem.init(
        {
            localReciclagem_id: { primaryKey: true, type: DataTypes.INTEGER },
            identificacao: DataTypes.STRING,
            cep: DataTypes.STRING,
            logradouro: DataTypes.STRING,
            numeroEndereco: DataTypes.STRING,
            complemento: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            capacidade: DataTypes.FLOAT,
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "LocaisReciclagem",
            createdAt: false,
            updatedAt: false,
        }
    );
    return LocaisReciclagem;
};