const express = require('express');
const router = express.Router();

const db = require('../database/db').cadastro;

router.get('/', (pedido, resposta) => {
    resposta.render('cadastroTela');
});

router.post("/", (pedido, resposta) => {
    db.inserirUsuario(pedido.body)
    resposta.json(pedido.body);
});

module.exports = router;