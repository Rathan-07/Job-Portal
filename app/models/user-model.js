const mongoose = require('mongoose')
const {Schema,model} = mongoose
// User - Schmea
const userSchema = new Schema({
    username:String,
    email:String,
    password:String,
    role:String
},{timestamps:true})

// User model

const User = model('User',userSchema)

module.exports = User