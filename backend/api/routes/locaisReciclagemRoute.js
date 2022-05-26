const {Router} = require("express");
const locaisReciclagemController = require("../Controllers/locaisReciclagemController");

const router = Router();

router.get("/locaisReciclagem", locaisReciclagemController.pegarTodosOsPontos);
router.post("/locaisReciclagem", locaisReciclagemController.criarLocalDeReciclagem);
router.put("/locaisReciclagem/:id", locaisReciclagemController.atualizarLocal);
router.delete("/locaisReciclagem/:id", locaisReciclagemController.apagarLocal);
module.exports =router;