// var express = require("express"),
//     mongoose = require("mongoose"),
//     passport = require("passport"),
//     bodyParser = require("body-parser"),
//     User = require("./models/user"),
//     LocalStrategy = require("passport-local"),
//     passportLocalMongoose = require("passport-local-mongoose")

// mongoose.connect("mongodb://localhost/auth_demo_app");
// var app = express();
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(require("express-session")({
//     secret: "Rusty is the best and cutest dog in the world",
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// //============
// // ROUTES
// //============

// app.get("/", function (req, res) {
//     res.render("home");
// });

// app.get("/secret", isLoggedIn, function (req, res) {
//     res.render("secret");
// });

// // Auth Routes

// //show sign up form
// app.get("/register", function (req, res) {
//     res.render("register");
// });
// //handling user sign up
// app.post("/register", function (req, res) {
//     User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
//         if (err) {
//             console.log(err);
//             return res.render('register');
//         }
//         passport.authenticate("local")(req, res, function () {
//             res.redirect("/secret");
//         });
//     });
// });

// // LOGIN ROUTES
// //render login form
// app.get("/login", function (req, res) {
//     res.render("login");
// });
// //login logic
// //middleware
// app.post("/login", passport.authenticate("local", {
//     successRedirect: "/secret",
//     failureRedirect: "/login"
// }), function (req, res) {
// });

// app.get("/logout", function (req, res) {
//     req.logout();
//     res.redirect("/");
// });


// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// }


// app.listen(3000, function () {
//     console.log("server started.......");
// })
var express               = require("express"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    mongoose              = require("mongoose");
mongoose.connect("mongodb://localhost/auth");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(require("express-session")({
    secret: "i m the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//==============
//Routes
//==============
app.get("/", function (req, res) {
    console.log("/home");
    res.render("home");
});

app.get("/login", function (req, res) {
    console.log("/lgin");
    res.render("login");
});
app.get("/secret",isLoggedIn ,function (req, res) {
    console.log("/secret");
    res.render("secret");
});

app.get("/register", function (req, res) {
    console.log("/register");
    res.render("register");
});

app.post("/register",function(req, res){
User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){ console.log(err); res.render("register");}
    else{
            passport.authenticate("local")(req, res, function () {
            res.redirect("/login"); 
        });
    }
    
});

});
app.post("/login",passport.authenticate("local",{
        successRedirect:"/secret",
        failureRedirect:"/login"
        }), function (req, res) {
            
    
        }
);
function isLoggedIn(req, res, next) {
    console.log("fired check");
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.get("/logout", function (req, res) {
    console.log("/logout");
    req.logout();
    res.redirect("/");
});

app.get("/:anyotherroute",function(req, res){
    console.log("other route");
    res.redirect("/");
});


app.listen(3000, process.env.IP,function (){
    console.log(" Server Started .........");
})