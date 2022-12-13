const express = require("express");
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);
app.listen(port, () => console.log(`A api esta rodando na porta ${port}`))