const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'user name is required'],
        unique:true
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required'],    
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true, 'phone number is required']
    },
    usertype:{
        type:String,
        required:[true, 'user type is required'],
        default:'client',
        enum:['client', 'admin', 'vendor', 'driver', 'restaurant contact','chatbot']
    },
    profile:{
        type:String,
        default:'https://www.flaticon.com/free-icon/user_149071'
    },
},{timestamps:true})

//export
module.exports = mongoose.model('User',userSchema)
