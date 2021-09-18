const express = require('express');
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./Models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

/*Everything in app.use are middlewares */

/*This will enable Cookies in our application */
app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
})
);

/*This will tell our application to USE cookies */
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
require('./routes/authRoutes')(app) //Function and passes app as parameter
require('./routes/billingRoutes')(app)

if(process.env.NODE_ENV === 'production'){
    //Express will serve up production assets 
    //like our main.js or main.css
    app.use(express.static('client/build'));
    //Express will serve up the index.html file
    //if it doesnt recognize the route
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);