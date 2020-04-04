const express = require('express');
const router = express.Router();

const categories = [
    { name: 'Food', parent: null },
    { name: 'Vegetables', parent: 'Food' },
    { name: 'Machines', parent: null },
    { name: 'Cosmetics', parent: null }
]

router.post('/', (req, res) => {
  const { error } = validateCategory(req.body);
  if(error) return res.status(400).send(error.details[0].message);
    
  const category = {
    name: req.boby.name, 
    parent: req.body.parent  
  };
  categories.push(category);
  res.send(category);
});

router.get('/:name', (req, res) => {
    const category = categories.find(c => c.name === req.params.name);
    if(!category) res.status(404).send('No category with the given name was not found');
    res.send(category);
  });

router.put('/:name', (req, res) => {
  const { error } = validateCategory(req.body);
  if(error) return res.status(400).send(error.details[0].message);
      
  const categorie = categories.find(c => c.name === req.params.name)
  if(!category) return res.status(404).send('No such category with the given name was found');

  category.name = req.body.name;
  category.parent = req.body.parent;
  res.send(category);
});

router.delete('/:name', (req, res) => {
    const categorie = categories.find(c => c.name === req.params.name)
    if(!category) return res.status(404).send('No such category with the given name was found');
  
    const index = categories.indexOf(category);
    categories.splice(index, 1);

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