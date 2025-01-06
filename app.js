//jshint esversion:6

require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption"); 
// const md5 = require("md5");
// const bcrypt = require("bcrypt");

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');


const session = require("express-session");
// const session = require('cookie-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(session({
    secret: "littlesecret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://UmarMongoDBAtlas:Umar-123@cluster0.exjln.mongodb.net/userDB");
// mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// console.log(process.env.API_KEY);

// const mySecret = "thisisourlittlesecret";
// userSchema.plugin(encrypt, {secret: process.env.MY_SECRET, encryptedFields: ["password"]});  

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://secret-vault-3-production.up.railway.app/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
        });
    }
));


app.get("/", function(req, res){
    res.render("home"); 
});

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile"]})
);

app.get("/auth/goolge/secrets", 
    passport.authenticate('google', {failureRedirect: '/login'}),
    function(req, res) {
        // Successful authentication, redirect secrets.
    res.redirect('/secrets');
});


app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/secrets", async function(req, res){
    const foundUsers = await User.find({"secret": {$ne: null}});
    if(foundUsers){
        res.render("secrets", {usersWithSecrets: foundUsers});
    }
});

app.get("/logout", function(req, res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }
    });
    res.redirect("/");
});

app.get("/submit", function(req, res){
    if(req.isAuthenticated()){
        res.render("submit");
    }
    else{
        res.redirect("/login");
    }
});




app.post("/register", async function(req, res){

    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if (err) { 
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
      });

});


app.post("/login", async function(req, res){
    const requestedUsername = req.body.username;
    const requestedPassword = req.body.password;

    const user = new User({
        username: requestedUsername,
        passport: requestedPassword
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
            res.redirect("/login");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            })
        }
    });
});

app.post("/submit", async function(req, res){
    const submittedSecret = req.body.secret;

    const foundUser = await User.findById(req.user.id);

    if(foundUser){
        foundUser.secret = submittedSecret;
        foundUser.save();
        res.redirect("/secrets");
    }

});




// const port = process.env.PORT || 3000;

app.listen(3000, function(){
    console.log("Server started on port 3000");
});