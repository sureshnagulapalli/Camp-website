var express 	= require('express'),
	router		= express.Router(),
	Campground 	= require('../models/campground'),
	middleware	= require('../middleware/');


// index route
router.get('/', (req,res) =>{
	
	Campground.find({}, function(err, campgrounds){
		if(err){console.log("error");}
		else{
			res.render('campgrounds/campground', {campgrounds: campgrounds});
		}
	});		
});

// create route
router.post('/', middleware.isLoggedIn, (req,res) => {
	var newCampground = req.body.newCampground;
	newCampground.author = {
		id: req.user._id,
		name: req.user.username
	}
	console.log(newCampground);
	Campground.create(newCampground, (err, campground)=>{
		if(err){
			req.flash('error','error to create new campground');
		}
		else{
			req.flash('success', 'successfully created campground');
			res.redirect('/campground');
		}
	});
});

// new route
router.get('/new', middleware.isLoggedIn, (req,res) =>{
	res.render('campgrounds/new');
});

// show route
router.get('/:id', (req, res) =>{
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
		if(err){ console.log("error");}
		else{
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

// EDIT route
router.get('/:id/edit', middleware.campgroundOwner, (req, res)=>{
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){ res.redirect('/campground'); }
		else {
			res.render('campgrounds/edit', {campground: campground});
		}
	})
})

// UPDATE route
router.put('/:id', middleware.campgroundOwner, (req, res)=>{
	Campground.findByIdAndUpdate(req.params.id, req.body.updateCampground, (err, updatedCampground)=>{
		if(err){ res.redirect('/campground'); }
		else {
			req.flash('success', 'successfully updated campground')
			res.redirect('/campground/' + updatedCampground._id);
		}
	})
})

// DESTROY route
router.delete('/:id', middleware.campgroundOwner, (req, res)=>{
	Campground.findByIdAndDelete(req.params.id, (err)=>{
		if(err){ res.redirect('/campground'); }
		req.flash('success', 'successfully deleted campground')
		res.redirect('/campground');
	})
})



module.exports = router;
