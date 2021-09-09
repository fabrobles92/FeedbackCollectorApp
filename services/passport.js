const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users') // with only one parameter is to fetch users model, with 2 is to insert into Mongo

//user below in the arrow function is the user that we are pasing in the done function in passport.use
passport.serializeUser((user, done) =>{
    done(null, user.id)
}); //here we set the user id to a cookie

//here we get the cookie store in the Browser and decode it to obtain the user it belongs to
passport.deserializeUser((id, done)=>{
    User.findById(id).exec()
        .then(user=> done(null, user))
});

passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).exec()
        .then((foundUser) => {
            if (foundUser){
                //User already autenthicated
                done(null, foundUser)
            } else {
                //Create new user
                new User({googleId: profile.id, fullName : profile.displayName}).save()
                    .then(user => done(null, user));   //.save() return a promise with the object just saved to the DB
            }
        })    
})
);


passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
   const foundUser = await User.findOne({googleId: profile.id});
   if (foundUser){
        return done(null, foundUser);
   }
    const newUser =  await new User({googleId: profile.id, fullName : profile.displayName}).save();
    done(null, newUser);
})
);