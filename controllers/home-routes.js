const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Logs in a user
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Show the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userName = await User.findOne({ where: { id: req.session.user_id }, raw: true });

    const posts = await Post.findAll({ 
      where: { user_id: req.session.user_id }, 
      include: [
      {
        model: User,
        attributes: ['name']
      }
    ],
    raw: true });
    
    res.render('dashboard', {
      user: userName, posts: posts,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get all posts
router.get('/', async (req, res) => {
  try {
    // Get all posts and join with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render(
      'homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a post by its ID with authorization
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User]
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render(
      'post', 
    {
      post: post,
      logged_in: req.session.logged_in
    }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
