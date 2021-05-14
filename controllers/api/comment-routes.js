const router = require('express').Router();
const { read } = require('fs');
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/:post_id', withAuth, async (req, res) => {
    try {
      console.log(req);
      console.log('bodyyy comment',req.body);
      console.log('user comment',req.session);
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.params.post_id,
        
      });
      console.log(newComment);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

// Update a comment 
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);

  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;