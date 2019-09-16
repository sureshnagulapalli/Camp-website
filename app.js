var express 				= require('express'),
	app 					= express(),
	bodyParser 				= require('body-parser'),
	mongoose 				= require('mongoose'),
	passport				= require('passport'),
	flash					= require('connect-flash'),
	localStrategy 			= require('passport-local'),
	passportLocalMongoose 	= require('passport-local-mongoose'),  
	Campground 				= require('./models/campground'),
	Comment 				= require('./models/comment'),
	User					= require('./models/users'),
	methodOverride			= require('method-override');
	//seedDB					= require('./seed');

var campgroundRoutes 	= require('./routes/campgrounds'),
	commentRoutes		= require('./routes/comments'),
	indexRoutes			= require('./routes/index')

//mongoose.connect('mongodb://localhost:27017/YelpCamp', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://suresh:!WtC-fMHQ$_773f@cluster0-n9a0x.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

//PASSPORT configuration
app.use(require('express-session')({
	secret: "big screen",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//sending current user data to all routes
app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
})


app.use("/", indexRoutes);
app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comments", commentRoutes);



app.listen(3000, () =>{
	console.log("Yelp camp has started");
});
