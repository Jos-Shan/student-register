let mongoose = require('mongoose');
let validator = require('validator');

const StudentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
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
    age: {
        type: Number,
        required: true,
        trim: true
    },

});

var Student = module.exports = mongoose.model("Student", StudentSchema);

// module.exports.get = function(callback, limit){
//     Student.find(callback).limit(limit);
// }
