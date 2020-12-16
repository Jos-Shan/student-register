//importing the mentor model
let User = require('../models/userModel');

//creating new user
const createUser = async (req, res) =>{
    const { body } = req;
    const user = new User(body);
    await user.save();
    return res.status(201).send(user)
};

//for changing password
const updateUser = async (req, res) =>{
    
};

//deleting user account
const deleteUser = async (req, res) =>{
    
};

//fetch user information, probably for login[read more about login end points]
const fetchUser = async (req, res) =>{
    let users = await User.find({})
    return res.status(200).send(users);
};

module.exports = { createUser, updateUser, deleteUser, fetchUser };
