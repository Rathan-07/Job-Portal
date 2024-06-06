const Job = require('../models/job-model')
const Application = require('../models/application-model')
const {validationResult} = require('express-validator')
const jobsCltr = {}
jobsCltr.list = async (req, res) => {
    try { 
        const jobs = await Job.find() 
        res.json(jobs)
    } catch(err) {  
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
}
jobsCltr.my = async (req, res) => {
   
    try { 
        const jobs = await Job.find({ recruiter: req.user.id})
       res.json(jobs) 
    } catch(err) {
        console.log("my-error",err) 
        res.status(500).json({ error: 'something went wrong in my'})
    }
}
jobsCltr.show = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const id  = req.params.id
        const job = await Job.findById(id)
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json(job)
    }
    catch(error){
        console.log(error);
    }
}
jobsCltr.create = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
          const body = req.body
          const job = new Job(body)
          job.recruiter = req.user.id
          await job.save()
          res.status(201).json(job)
    }
    catch(error){
        console.log(error);
    }
}
jobsCltr.udpate = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body  = req.body
        const id = req.params.id
        const job = await Job.findOneAndUpdate({recruiter:req.user.id, _id:id},body,{new:true})
        if(!job){
            return res.status(404).json({error:'job not found'})
        }
        res.json(job)
    }   
    catch(error){
            console.log(error)
    }
   
  
}
jobsCltr.remove = async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
       const id = req.params.id
       const job = await Job.findOneAndDelete({recruiter:req.user.id, _id:id})
       if(!job){
        return res.status(404).json({error:"Job not found"})
       }
       res.json(job)
    }
    catch(error){
        console.log(error);
    }
}
jobsCltr.applications  = async (req,res)=>{
    const id = req.params.id
    const job = await Job.findOne({_id:id,recruiter:req.user.id})
    // console.log(job)
    if(!job){
        return res.status(404).json({error:'record not found'})
    }
    const applications= await Application.find({job:job._id}).populate('candidate')
    
    res.json(applications)
}
jobsCltr.singleApplication = async (req,res)=>{
    const id = req.params.id;
    const appId = req.params.appId
    const job  = await Job.findOne({ _id:id, recruiter:req.user.id})
    if(!job){
        return res.status(404).json({error:'job not found'})
    }
    const application= await Application.findOne({_id: appId, job:job._id}).populate('job').populate('candidate')
    res.json(application)
}
jobsCltr.applicationUpdate = async (req,res)=>{
    const id = req.params.id
    const appId = req.params.appId
    const body =  req.body
    const job  = await Job.findOne({_id:id, recruiter:req.user.id})
    if(!job){
        return res.status(404).json({error:'record not found'})
    }
    const application= await Application.findOneAndUpdate({_id: appId, job:job._id},body,{new:true})
    res.json(application)
}
module.exports = jobsCltr;