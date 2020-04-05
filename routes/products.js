const { validate } = require('../models/product');
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
 const { error } = await validate(req.body);
 if(error) return res.status(400).send('Invalid post request.');

 const product = new Product({
     name: req.body.name,
     
 })
});

module.exports = router;