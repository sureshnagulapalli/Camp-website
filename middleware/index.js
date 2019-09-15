var Campground 	= require('../models/campground'),
	Comment		= require('../models/comment');

var middleware = {}

middleware.campgroundOwner = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err, foundCampground)=>{
			if(err){ 
				req.flash('error', 'campground not found');
				res.redirect('back'); 
			}
			else{
				if(foundCampground.author.id.equals(req.user.id)){
					next();
			   }
				else{
					req.flash('error', 'you do not have permission to that');
					res.redirect('back');
				}
			}
		})	
	}
	else{
		req.flash('error', 'you need to be logged in first');
		res.redirect('back'); 
	}
}

middleware.commentOwner = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, foundComment)=>{
			if(err){ 
				req.flash('error', 'comment not found');
				res.redirect('back');
			}
			else{
				if(!foundComment){
					req.flash('error', 'could not find your data');
					res.redirect('back');
				   }
				if(foundComment.author.id.equals(req.user.id)){
					next();
				}
				else{
					req.flash('error', 'you do not have permission to do that');
					res.redirect('back');
				}
			}
		})
	}
	else{
		req.flash('error', 'you need to be logged in first');
		res.redirect('home');
	}
}


middleware.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error', 'you should login first');
	res.redirect('/login');
}

module.exports = middleware;

