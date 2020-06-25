const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    avator:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    }
});

<<<<<<< HEAD
module.exports = User = mongoose.model('users', UserSchema);
=======
module.exports = User = mongoose.model('user', UserSchema);
>>>>>>> f88cd592173f778c2e3c6905c8e8fc906f04baf5
