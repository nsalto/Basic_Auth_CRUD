const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required: false,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

// Crypt password
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next()
    } catch(error) {
        next(error);
    }
});

// Validate password
userSchema.methods.isPasswordValid = async function(value) {
    try {
        return await bcrypt.compare(value, this.password)
    } catch(error) {
        throw new Error(error);
    }
};

//Export the model
module.exports = mongoose.model('User', userSchema);