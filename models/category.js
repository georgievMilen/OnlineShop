const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true, 
    minlength:3,
    maxlength: 20
  },
  parentId: String
});
  
const Category = mongoose.model('Categories', categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string().min(3).required(),
    parentId: Joi.ObjectId()
  };    
  return Joi.validate(category, schema);
}

exports.validate = validateCategory;
exports.Category = Category;