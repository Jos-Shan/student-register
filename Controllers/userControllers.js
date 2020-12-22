//importing the mentor model
let User = require('../models/userModel');

//creating new user
const createUser = async (req, res) =>{
    try{
        const user = new User(req.body);
        await user.save();
        const token =  await user.generateAuthToken();
        res.status(201).send({user, token});
    }catch (error){
        res.status(400).send(error);
    } 
};

//login registered user
const loginUser = async (req, res) =>{
    try{
        const {email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        
        if(!user){
            return res.status(401).send({error: 'Login Failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        
        res.send({user, token})
        
    }catch (error){
        console.log(error)
        res.status(400).send(error)
    }
};

//deleting user account
const deleteUser = async (req, res) =>{
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user){
       return res
       .status(404) 
       .send({error: 'The account you are searching for was not found'});
    }
    await user.deleteOne(user);
    return res
    .status(200)
    .send({message: `${user.fullName}.  your account has been deleted`});
};

//view logged in user 

const fetchUser = async (req, res) =>{
    res.send(req.user);
};

const fetchAllUsers = async (req, res) =>{
    let users = await User.find({})
    return res.status(200).send(users);
}

//logout user out of the application
const logOutUser = async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !=req.token
        })
        await req.user.save()
        res.send()
    }catch(error){
        res.status(500).send(error)
    }
}

//middleware
const auth = async (req, res) =>{
    const token = req.header('Authorization').replace('Bearer ', '')

    try{
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({_id: data._id, 'tokens.token': token});

        if(!user){
            throw new Error()
        }
        req.user = user
        req.token =  token
        netx()
    }catch (error){
        res.status(401).send({error: "not authorized to access this resource"})
    }
}

module.exports = { createUser, loginUser, deleteUser, fetchUser, logOutUser, auth, fetchAllUsers};
