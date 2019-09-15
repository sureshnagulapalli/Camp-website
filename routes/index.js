var express 	= require('express'),
	router		= express.Router(),
	User		= require('../models/users'),
	passport 	= require('passport');


//home page
router.get('/', (req,res) => {
	res.render("landing");
});

//-------
// Auth routes
//------

//register route
router.get('/register', (req, res)=>{
	res.render('register');
})

router.post('/register', (req, res)=>{
	User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
		if(err){
			req.flash('error', err.message);
			res.redirect('/register');
		}
		passport.authenticate('local')(req, res, ()=>{
			req.flash('success', 'logged in successfully');
			res.redirect('/');
		})
	})
})
	
// login route
router.get('/login', (req, res)=>{
	res.render('login');
})

router.post('/login', passport.authenticate('local',{
		successRedirect: "/campground",
		failureRedirect: "/login"
	}), (req, res)=>{
})

// logout
 router.get('/logout', (req, res)=>{
	 req.logout();
	 req.flash('success', 'successfully logged you out')
	 res.redirect('/campground');
 })



module.exports = router;
