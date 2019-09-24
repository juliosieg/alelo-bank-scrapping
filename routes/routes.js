const express = require('express');
const router = express.Router();
const aleloController = require('../controllers/aleloController');

router.get('/', (req, res, next) => {
    res.render('index', {cpf: '', password: '', err: '', data: ''});
});

router.post('/', aleloController.consulta);

module.exports = router;