const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
  // find all categories
    const categoryData = await Category.findAll({
        // be sure to include its associated Products
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => { 
  try {
  // find one category by its `id` value
  const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
    includes: [{model: Product}],
  });
  if (!categoryData) {
    res.status(404).json({message: 'No Products found with this id.'});
    return;
  }
  res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({message: 'No Products found with this id.'});
      return;
    }
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where:{
          id: req.params.id
        }
      },
    )
    res.json(categoryData)
    } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where:{
          id: req.params.id
        }
      },
    )
    res.json(categoryData)
    } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;
