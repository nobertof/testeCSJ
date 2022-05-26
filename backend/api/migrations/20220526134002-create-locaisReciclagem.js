'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('LocaisReciclagem', {
      localReciclagem_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      identificacao: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      cep: {
        type: Sequelize.STRING(10)
      },
      logradouro: {
        type: Sequelize.STRING(100)
      },
      numeroEndereco: {
        type: Sequelize.STRING(10)
      },
      complemento: {
        type: Sequelize.STRING(30)
      },
      bairro: {
        type: Sequelize.STRING(50)
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      capacidade: {
        allowNull: false,
        type: Sequelize.FLOAT
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('LocaisReciclagem');
  }
};
