const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


console.log('log right before route /login route!!!')
// Logs in a user
router.get('/login', (req, res) => {
  console.log('$$$$$$$$We hit the login pageeee show me the page route!!', req.session)
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
    console.log('WE HIT THE DASHBOARD ROUTE!!!!!!')
    const userName = await User.findOne({ where: { id: req.session.user_id }, raw: true });
    // console.log('USER DATAT on the dashboard raote!!!', userName)

    const posts = await Post.findAll({ 
      where: { id: req.session.user_id }, 
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
  console.log('We hit hte / route who tries to find all the posts!!!')
  // console.log('we hit ht ehome route!!!')
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
      // postData
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
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render(
      // postData
      'post', 
    {
      ...post,
      logged_in: req.session.logged_in
    }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
