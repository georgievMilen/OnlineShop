const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const categorySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true, 
    minlength:3,
    maxlength: 20
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'name'
  }
});

const Category = mongoose.model('Categories', categorySchema);

router.post('/', async (req, res) => {
  const { error } = validateCategory(req.body);
  if(error) return res.status(400).send(error.details[0].message);
    
  let category = new Category({
    name: req.body.name,
    parent: req.body.parent
  });

  category = await category.save();
  res.send(category);
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) res.status(404).send('No category with the given id was not found');
    
    res.send(category);
  });

router.put('/:id', async (req, res) => {
  const { error } = validateCategory(req.body);
  if(error) return res.status(400).send(error.details[0].message);
       
  const category = await Category.findByIdAndUpdate(req.params.id,
   { name: req.body.name, parent: req.body.parent },
   {new: true 
  });
  if(!category) return res.status(404).send('The category was not found.');

  res.send(category);
});

router.delete('/:id', async (req, res) => {
    const categorie = await Category.findByIdAndRemove(req.params.id);
    if(!category) return res.status(404).send('No such category with the given name was found');

    res.send(category);
  });
  
function validateCategory(category) {
  const schema = {
    name: Joi.string().min(3).required(),
    parent: Joi.string().min(3)
  };    
  return Joi.validate(category, schema);
}

module.exports = router;  