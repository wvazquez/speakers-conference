const express = require('express');
const UserModel = require('../../models/UserModels');
const router = express.Router();

module.exports = (params) => {
  const { } = params;
  router.get('/login', (req, res) => {
    res.render('users/login')
  });
  router.get('/registration', (req, res) =>
    res.render('users/registration', { success: req.query.success }));

  router.post('/registration', async (req,res,next) =>{
    try {
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      const savedUser = user.save();
      if(savedUser) return res.redirect('/users/registration?success=true');
      return next(new Error("Failed to save user."))
    } catch (err) {
      return next(err);
    }
  });  

  router.get('/account', (req, res) =>
    res.render('users/account', { user: req.user }));

  return router;
};
