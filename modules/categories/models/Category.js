const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true, 
    minlength:3,
    maxlength: 20
  },
  parent: { 
    type: new mongoose.Schema({
      type: mongoose.Schema.Types.ObjectId,
      name: String
    })
    
  }
});
  
const Category = mongoose.model('Categories', categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string().min(3).max(20).required(),
    parentId: Joi.string()
  };    
  return Joi.validate(category, schema);
}

exports.validate = validateCategory;
exports.Category = Category;