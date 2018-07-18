const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// connecting mongoose to the route inside the batabase
mongoose.connect('mongodb://localhost/manskybase');

// connecting the routes from batabase to the mongoose
let db = mongoose.connection;

// creating a schema for the User object
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  }
})

// create a variable that you can utilize and pass it on to the 
// mongoose database
let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback)=>{
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
        newUser.save(callback)
    });
})
}


module.exports.getUserByUsername = function (username, callback) {
  let query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}


module.exports.comparePassword = function (candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  })
}




