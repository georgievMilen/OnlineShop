const { validate } = require('../models/category');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const parentCategory = await Customer.findById(req.body.parentId);
  if(!parentCategory) return res.status(400).send('Invalid parent category');
    
  let category = new Category({
    name: req.body.name,
    parentId: parentCategory.name
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
  const { error } = validate(req.body);
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
  
module.exports = router;  