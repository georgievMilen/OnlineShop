const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlength: 3, 
        maxlength: 20
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0  
    },
    priceWithDiscount: {
        type: Number,
        min: 0
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
  });

const Product = mongoose.model('Products', productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string().required().minlenght(3).maxlength(20),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    priceWithDiscount: Joi.number().min(0)
};

  return Joi.validate(product, schema);
}


  exports.validate = validateProduct;
  exports.Product = Product;