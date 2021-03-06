//import express
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let studentRoutes = require('./Routes/studentRoutes');
let userRoutes = require('./Routes/userRoutes');

//start app
let app = express();
//assign port 
var port = process.env.PORT || 8081;

//connect to mongoose
const dbPath = 'mongodb://localhost:27017/students-db';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
const mongo = mongoose.connect(dbPath, options);

//handle errors
mongo.then(()=>{
    console.log('connected');
}, error => {
    console.log(error, 'error');
});

//configure bodyparser to handle the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

//use API routes in the app
app.use('/students', studentRoutes);
app.use('/users', userRoutes);




//launch app to the specified port

app.listen(port, function(){
    console.log("app is running on port "  +port)
});




