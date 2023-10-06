const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const tagRoutes = await Tag.findAll({
  // be sure to include its associated Product data
      include: [
        {model:Product}
      ],
    });
    res.status(200).json(tagRoutes);
    }
    catch (err) {
    res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    const tagRoutes = await Tag.findByPk(req.params.id,{
  // be sure to include its associated Product data
  include: [
        {model:Product}
      ],
    });

    res.status(200).json(tagRoutes);
    }
    catch (err) {
    res.status(500).json(err);
    } 
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagRoutes = await Tag.create(req.body);
    res.status(200).json(tagRoutes);
    } catch (err) {
      res.status(500).json(err);
      } 
  });

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagRoutes = await Tag.create(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!tagRoutes) {
      res.status(404).json(
        { 
          message: 'No tags found with this id.' 
        }
      );
      return;
    }     res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  } 
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagRoutes = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!tagRoutes) {
      res.status(404).json({ 
          message: 'No tag found with matching id.' 
      });
      return;
    }
    res.status(200).json('Tag deleted.');
  } catch (err) {
    res.status(500).json(err);
  } 
});

module.exports = router;
