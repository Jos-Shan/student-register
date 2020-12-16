let mongoose = require('mongoose');
let validator = require('validator');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value =>{
            if(!validator.isEmail(value)){
                throw new Error ({error: 'Invalid email address'})
            }
        }
    },
    password: {
        type: String,
        require: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }

});

UserSchema.pre('save', async function(next){
    //hash passwords before saving them
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

UserSchema.methods.generateAuthToken = async function(){
    //generate an auth token for admin
    const user = this
    const token = jwt.sign({_id: user_id}, process.env.JWT_KEY) //generate jwt_key
    user.tokens = user.tokens.concat({user})
    await user.save()
    return token
};

UserSchema.statics.findByCredentials = async (email, password) =>{
    //search for admin by email
    const user = await User.findOne({email})
    if(!user){
        throw new Error({error: 'Invalid Login Credentials'})
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        throw new Error ({error: 'Invalid Login credentials'})
    }
    return user
}

var User = module.exports = mongoose.model("User", UserSchema);

module.exports.get = function(callback, limit){
    User.find(callback).limit(limit);
}