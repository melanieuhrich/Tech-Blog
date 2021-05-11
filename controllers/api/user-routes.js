const router = require('express').Router();
const { User } = require('../../models');

// Creates a new user
router.post('/', async (req, res) => {
  // console.log('SIGN UP ROUTE hittt!!', req.body)
    try {
      const userData = await User.create(req.body);
      // console.log('We made this new user', userData)
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        // console.log('WE jsut saved a sesssionnnnn')
        res.status(200).json(userData);
      });
    } catch (err) {
      // console.log('SING UP ERROR', err)
      res.status(400).json(err);
    }
  });

// Logs in a user
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Logs out a user 
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
module.exports = router;
  