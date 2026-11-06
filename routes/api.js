const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/status', apiController.status);
router.get('/produk', apiController.produk);
router.get('/produk/:id', controller.getProdukById);

router.post('/produk', controller.createProduk);
router.put('/produk/:id', controller.updateProduk);
router.delete('/produk/:id', controller.deleteProduk);

module.exports = router;
