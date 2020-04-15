const { validate } = require('../models/category');
const { Category } = require('../models/category');
const validator = require('../middleware/validate')
const express = require('express');
const router = express.Router();

router.post('/', validator(validate), async (req, res) => {
  const parentCategory = await Category.findById(req.body.parentId);
  if(!parentCategory) {
    const category = new Category({
      name: req.body.name,
    });

    await category.save();

    res.send(category);
  }

    
  const category = new Category({
    name: req.body.name,
    parent: {
      _id: parentCategory._id,
      name: parentCategory.name
    }
  });

  await category.save();

  res.send(category);
});
router.get('/', async (req, res) => {
  const category = await Category.find();
  
  res.send(category);
});
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) res.status(404).send('No category with the given id was not found');
    
    res.send(category);
  });

router.put('/:id', validator(validate), async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id,
   { name: req.body.name, parent: req.body.parent },
   {new: true 
  });
  if(!category) return res.status(404).send('The category was not found.');

  res.send(category);
});

router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if(!category) return res.status(404).send('No such category with the given name was found');

    res.send(category);
  });
  
module.exports = router;  