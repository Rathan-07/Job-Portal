const mongoose = require('mongoose')
const {Schema,model} = mongoose;
// recruiter model

const recruiterSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    firstName:String,
    email:String,
    mobile:String,
    companyWebiste:String,
    address:String,
},{timestamps: true })

const Recruiter = model('Recruiter',recruiterSchema)

module.exports = Recruiter;