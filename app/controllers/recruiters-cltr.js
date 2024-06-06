
const Recruiter = require('../models/recruiter-model')
const {validationResult} = require('express-validator')
const recruiterCltr = {}

recruiterCltr.create =async (req,res)=>{
const errors = validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
const body = req.body;
try {
    const recruiter = new Recruiter(body)
    recruiter.userId = req.user.id
    await recruiter.save()
    res.json(recruiter)
}
catch(err){
    res.status(500).json({ error: 'something went wrong'})
}
}
recruiterCltr.show = async(req,res)=>{
    try{
        const recruiter = await Recruiter.findOne({userId:req.user.id})
        res.json(recruiter)
     }catch(err) {
       
        res.status(500).json({ error: 'something went wrong'})
    }
}
recruiterCltr.update = async(req,res)=>{
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } 
    const body = req.body
    try{
        const recruiter = await Recruiter.findOneAndUpdate({userId:req.user.id},body,{new:true})
        res.json(recruiter)
    }
    catch(err) {
    
        res.status(500).json({ error: 'something went wrong'})
    }

}
module.exports = recruiterCltr;