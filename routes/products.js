const { validate } = require('../models/product');
const { Product } = require('../models/product');
var multer      = require('multer');
const validator = require('../middleware/validate');
const express = require('express');
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
 
var upload = multer({ storage: storage });

router.get('/', async(req, res) => {
  const from = req.query.from || 0;
  const to = req.query.to || 0;
  const limiter = parseInt(req.query.limit) || 0;
  const limiterDisc = parseInt(req.query.limitDisc) || 0;
  const lowestPrice = parseInt(req.query.lowestPrice) || 0;

  if(from&&to){
    const products = await Product
    .find({ price: { $gte: from, $lte: to }});
    res.send(products);
  }
  if(limiter){
    const products = await Product
    .find().sort({ dateAdded: -1 }).limit(limiter)
    res.send(products);  
  }
  if(limiterDisc){
    const products = await Product
    .find({priceWithDiscount: { $ne: null}})
    .sort({ dateAdded: -1 }).limit(limiterDisc);
    res.send(products);
  }
  if(lowestPrice){
    const products = await Product
    .find()
    .sort({ price: 1, priceWithDiscount: 1}).limit(lowestPrice);
    res.send(products);
  } else { 
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write('</form>');
      return res.end();
  }
});



router.post('/',upload.single('image'), async(req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send('Input file is required');
  try{
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      priceWithDiscount: req.body.priceWithDiscount,
      imageType: req.file.mimetype,
      imagePath: req.file.path
    });
    await product.save();
  
    res.send(product);

  } catch(ex){
    res.send(ex.message);
  }
});

router.put('/:id', validator(validate), async(req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      priceWithDiscount: req.body.priceWithDiscount
    }, { new: true 
  });

  res.send(product);
});

router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if(!product) return res.status(404).send('No product with the given id found.');

  res.send(product);
});

module.exports = router;