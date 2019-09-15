var express 	= require('express'),
	router 		= express.Router({mergeParams: true}),
	Comment  	= require('../models/comment'),
	Campground 	= require('../models/campground'),
	middleware	= require('../middleware/');					  



// comment create route
router.get('/new', middleware.isLoggedIn, (req, res) =>{
	Campground.findById(req.params.id, (err, foundCampground)=>{
		if(err){ console.log(err) }
		else{ res.render('comments/new', {campground: foundCampground}); }
	})
})

// comment posting route
router.post('/', middleware.isLoggedIn, (req, res)=>{
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){ console.log(err) }
		else{
			Comment.create(req.body.newComment, (err, addComment)=>{
				if(err){ res.redirect('/campground'); }
				else{
					addComment.author.id = req.user._id;
					addComment.author.name = req.user.username;
					addComment.save();
					campground.comments.push(addComment) 
					campground.save();
					req.flash('success', 'successfully created comment')
					res.redirect('/campground/' + campground._id );
				}
			})
		}
	} )
})

//EDIT route
router.get('/:comment_id/edit', middleware.commentOwner, (req, res)=>{
	Comment.findById(req.params.comment_id, (err, comment)=>{
		if(err){ res.redirect('back'); }
		else{
			res.render('comments/edit', {campground_id: req.params.id, comment: comment});
		}
	})
})

//UPDATE route
router.put('/:comment_id', middleware.commentOwner ,(req, res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updateComment)=>{
		if(err){ res.redirect('back'); }
		else{
			req.flash('success', 'successfully updated comment');
			res.redirect('/campground/' + req.params.id);
		}
	})
})

//DESTROY route
router.delete('/:comment_id', middleware.commentOwner, (req, res)=>{
	Comment.findByIdAndDelete(req.params.comment_id, (err)=>{
		if(err){ res.redirect('/campground/' + req.params.id); }
		req.flash('success', 'successfully deleted comment')
		res.redirect('/campground/' + req.params.id);
	})
})



module.exports = router;