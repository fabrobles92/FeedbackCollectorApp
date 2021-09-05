const mongoose = require('mongoose')
const {Schema} = mongoose

mongoose.model('users', new Schema({
    googleId: String,
    fullName: String
})
);

//Basically this doesnt need and export module because when im gonna perform testing with different tools
//mongoose can get confused because will understand every time we want to create a 'users' model.
//So we only need to "require" mongoose in other part to fetch the models