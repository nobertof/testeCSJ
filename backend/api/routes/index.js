const express = require('express');
const locaisReciclagem = require("./locaisReciclagemRoute");

module.exports = (app)=>{
    app.use(express.json())
    app.use(locaisReciclagem)
}
