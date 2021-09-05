const express = require('express');
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./Models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

/*This will enable Cookies in our application */
app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
})
);

/*This will tell our application to USE cookies */
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app) //Function and passes app as parameter


const PORT = process.env.PORT || 5000;

app.listen(PORT);