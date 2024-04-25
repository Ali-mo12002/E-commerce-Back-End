const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
  
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
  
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category with the provided name from the request body
    const newCategory = await Category.create({
      category_name: req.body.category_name // Assuming category_name is provided in the request body
    });

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id',  (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory =  Category.update(req.body, {
      where: {
        id: req.params.id 
      }
    });
    if (updateCategory) {
      res.status(200).json({ message: 'Category updated successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',  (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory =  Category.destroy({
      where: {
        id: req.params.id 
      }
    });
    if (deleteCategory) {
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
