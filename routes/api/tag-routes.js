const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData =  await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/',  (req, res) => {
  // create a new tag
  try {
    const newTagData =  Tag.create(req.body);
    res.status(200).json(newTagData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id',  (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTagData =  Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedTagData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id',  (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTagData =  Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deletedTagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
