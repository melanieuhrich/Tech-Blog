const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Show the create post page
router.get('/create-post', async (req, res) => {
  try {
    console.log('create post route hit');
    
    res.render('create-post', {})
  } catch (err) {
    res.status(500).json(err)
  }
});
/////

// Create a new post
router.post('/', async (req, res) => {
  try {
    console.log('post created!!');

    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ],
      raw: true
    });

    res.render(postData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// Get a post by ID
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ],
      raw: true
    });

    res.render(postData)
  } catch (err) {
    res.status(500).json(err)
  }
  
});

// Update a post 
router.put('/edit-post', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.render('edit-post', {});
    } catch (err) {
      res.status(500).json(err);

  } 
}); //////////// don't know ////////////

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;