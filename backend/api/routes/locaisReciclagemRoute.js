const {Router} = require("express");
const locaisReciclagemController = require("../Controllers/locaisReciclagemController");

const router = Router();

router.get("/locaisReciclagem", locaisReciclagemController.pegarTodosOsPontos);

module.exports =router;