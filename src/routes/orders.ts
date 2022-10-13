import express from 'express';
const orderHandle = require('../handlers/orders');
const {authenticate} = require('../middleware/authentication');

const router = express.Router()
router.use(express.json())

router.get('/current' , authenticate , orderHandle.showOrder);
router.get('/complete' , authenticate , orderHandle.showComplete);
router.post('/create' ,authenticate,  orderHandle.createOrder);
router.post('/orders/:id/products' , authenticate , orderHandle.addProducts);
module.exports = router