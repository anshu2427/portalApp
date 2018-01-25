var express = require('express');
var router = express.Router();
//var csrf = require('csurf');
var passport = require('passport');

var Register = require('../models/register');
var Result = require('../models/result');
var Center = require('../models/center');
var Event = require('../models/event');


router.get('/adminhome', isLoggedIn, function(req, res, next) {
   Center.find()
 .then(function(doc2){
    res.render('user/adminhome' , {centerers: doc2, title: 'Admin Panel' });
  });
});


/* GET Admin pages. */

router.get('/addcover', isLoggedIn , function(req, res, next) {
   Center.find()
 .then(function(doc2){
 res.render('user/addcover', {centerers: doc2, title: 'Add Cover' });
});
});

router.get('/addcenter', isLoggedIn , function(req, res, next) {
   Center.find()
 .then(function(doc2){
  res.render('user/addcenter', {centerers: doc2, title: 'Add Center Detail' });
});
});

router.get('/addcourse', isLoggedIn , function(req, res, next) {
    var messages = req.flash('error');
     Center.find()
 .then(function(doc2){
    res.render('user/addcourse', {centerers: doc2,  title: 'Add Course Info' , messages: messages , hasErrors: messages.length > 0});
 // res.render('user/addcourse', { title: 'Add Course Info' });
});
});

router.get('/addnews', isLoggedIn , function(req, res, next) {
   Center.find()
 .then(function(doc2){
  res.render('user/addnews', {centerers: doc2, title: 'Add News And Events' });
});
});

router.get('/adminsettings', function(req, res, next) {
   Center.find()
 .then(function(doc2){
  res.render('user/adminsettings', {centerers: doc2, title: 'Admin Settings' });
});
});



//var csrfProtection = csrf();
//router.use(csrfProtection);

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/user/signin');
});
/*
router.use('/', notLoggedIn, function(req, res, next){
  next();
});
*/

// change here
router.get('/signup', isLoggedIn, function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', { messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/adminhome',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', { title: 'UTEI Sign In' , messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/adminhome',
    failureRedirect: '/user/signin',
    failureFlash: true
}));




module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/signin');
}


function notLoggedIn (req, res, next) {
     if(!req.isAuthenticated()){
       return next();
     }
 res.redirect('/');
  }

