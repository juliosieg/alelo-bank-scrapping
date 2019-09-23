const express = require('express');
const router = express.Router();
const aleloController = require('../controllers/aleloController');

router.get('/', (req, res, next) => {
    res.render('index', {data: ''});
});

router.post('/consulta', aleloController.consulta);

module.exports = router;