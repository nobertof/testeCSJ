'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('LocaisReciclagem', [
      {
        identificacao: "LR-Jardim Satélite",
        cep: "12230-480",
        logradouro: "Rua Estrela Dalva",
        numeroEndereco: "135",
        bairro: "Bosque dos Eucaliptos",
        cidade: "São José dos Campos",
        capacidade: 500.5,
      },
      {
        identificacao: "LR-Altos de Santana",
        cep: "12214-010",
        logradouro: "Rua Alto do Rio Doce",
        numeroEndereco: "1075",
        bairro: "Jardim Altos de Santana",
        cidade: "São José dos Campos",
        capacidade: 300,
      },
      {
        identificacao: "LR-Novo Horizonte",
        cep: "",
        logradouro: "Rua Presidente Tancredo Neves",
        numeroEndereco: "",
        bairro: "Parque Novo Horizonte",
        cidade: "São José dos Campos",
        capacidade: 600.89,
      },
      {
        identificacao: "LR-Campo dos Alemães",
        cep: "12239-820",
        logradouro: "Rua dos Evangélicos",
        numeroEndereco: "601",
        bairro: "Campo dos Alemães",
        cidade: "São José dos Campos",
        capacidade: 500,
      },
      {
        identificacao: "LR-Urbanova",
        bairro:"Condomínio Chácara dos Eucaliptos",
        cidade:"São José dos Campos",
        capacidade: 300.4,
      },
      {
        identificacao: "LR-Putim",
        cep: "12228-004",
        logradouro: "Rua Vicente Brandão Ferreira",
        numeroEndereco: "293",
        bairro: "Jardim Santa Luzia",
        cidade: "São José dos Campos",
        capacidade: 500,
      },
      {
        identificacao: "LR-Galo Branco",
        cep: "12247-580",
        logradouro: "Rua Benedito Luiz de Medeiros",
        numeroEndereco: "811",
        complemento:"Conj. Res. Galo Branco",
        bairro: "",
        cidade: "São José dos Campos",
        capacidade: 400.35,
      },
      {
        identificacao: "LR-Interlagos",
        cep: "12229-816",
        logradouro: "Rua Ubirajara Raimundo de Souza",
        numeroEndereco: "21",
        bairro: "Parque Interlagos",
        cidade: "São José dos Campos",
        capacidade: 450,
      },
      {
        identificacao: "LR-Jardim Paulista",
        cep: "12215-390",
        logradouro: "Rua Ana Gonçalves da Cunha",
        numeroEndereco: "",
        bairro: "Monte Castelo",
        cidade: "São José dos Campos",
        capacidade: 500.1,
      },

    ], {})
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('LocaisReciclagem', null, {})
  }
};
