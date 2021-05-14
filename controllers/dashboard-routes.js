const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// Show the edit post page
router.get('/edit-post/:id', withAuth, async (req, res) => {
    try {

        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });


        res.render('edit-post', { layout: 'dashboard', post})
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;