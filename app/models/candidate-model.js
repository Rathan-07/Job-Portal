const mongoose = require('mongoose')
const { Schema, model } = mongoose 

const candidateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstname: String,
    lastname: String,
    mobile: String,
    address: String, 
}, { timestamps: true })

const Candidate = model('Candidate', candidateSchema)

module.exports = Candidate 