var mongoose 	= require('mongoose');
var Campground 	= require('./models/campground');
var Comment		= require('./models/comment');

var data = [
	{
		name: "picnic",
		image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419__340.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
	},
	{
		name: "picnic",
		image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419__340.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.la bal bla lorem ipsum dolor"
	},{
		name: "picnic",
		image: "https://cdn.pixabay.com/photo/2016/01/26/23/32/camp-1163419__340.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
	}
]


function seedDB(){
	Campground.deleteMany({}, function(err){
		if(err){ console.log(err) }
		console.log("campground deleted");
		// creating  campgrounds
		data.forEach(function(data){
			Campground.create(data, function(err, campground){
				if(err){ console.log(err); }
				else{
					console.log("campground created");
					// creating comments
					Comment.create({
						text: "this place is awesome!",
						author: "sat"
					}, function(err, comment){
						if(err){ console.log(err); }
						else{ 
							campground.comments.push(comment);
							campground.save();
							console.log("comment created");
						}
					})
				}
			})
		})
	})
}

module.exports = seedDB();
