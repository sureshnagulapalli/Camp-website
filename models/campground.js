var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	price: Number,
	description: String,
	comments: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		name: String
	}
	
});

module.exports = mongoose.model('Campground', campgroundSchema);