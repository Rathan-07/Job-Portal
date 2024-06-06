require('dotenv').config()
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const express = require('express')

const {checkSchema} = require('express-validator')
const configureDB = require('./config/db')
const cors = require('cors')
// validations
const userRegisterValidationSchema = require('./app/validations/user-register-validations')
const userLoginValidationSchema = require('./app/validations/user-login-validationsSchema')
const {candidateValidationSchema, candidateEditValidationSchema} = require('./app/validations/candidate-validation')
const {recruiterValidationSchema,recruiterEditValidationSchema} = require('./app/validations/recruiter-validation')
const  jobValidationSchema = require('./app/validations/job-validationSchema')
const {applicationValidationSchema} = require('./app/validations/applicationValidationSchema')
// middlewares
const authenticationUser = require('./app/middlewares/authenticateUser')
const authorizedUser = require('./app/middlewares/authorized')


const usercltr = require('./app/controllers/users-cltr')
const jobsCltr = require('./app/controllers/jobs-cltr')
const candidatesCltr = require('./app/controllers/candidates-cltr')
const recruiterCltr = require('./app/controllers/recruiters-cltr')
const applicationCltr = require('./app/controllers/applications-cltr')
const app = express()
const port = 3068
configureDB()

app.use(express.json())
app.use(cors())

const logFilePath = path.join('C:', 'Users', 'Rathan', 'Desktop', 'dct', 'Job-portal-server', 'logs.txt');

const accessLogStream = fs.createWriteStream(path.join(logFilePath), { flags: 'a' });

// Use Morgan middleware for logging, specifying the file stream
app.use(morgan('combined', { stream: accessLogStream }));

app.use(function(req,res,next){
    console.log(`${req.ip}- ${req.method} - ${req.url} -${new Date()}`)
    next()
})




app.post('/users/register',checkSchema(userRegisterValidationSchema),usercltr.register)
app.post('/users/login',checkSchema(userLoginValidationSchema),usercltr.login )
app.get('/users/account',authenticationUser ,usercltr.accounts)

app.get('/users/checkemail',usercltr.checkEmail)




//routing middleware-candidates
app.post('/api/candidates/profile',authenticationUser,authorizedUser(['candidate']),checkSchema(candidateValidationSchema),candidatesCltr.create)
app.get('/api/candidates/profile', authenticationUser, authorizedUser(['candidate']), candidatesCltr.show)
app.put('/api/candidates/profile',authenticationUser,authorizedUser(['candidate']),checkSchema(candidateEditValidationSchema),candidatesCltr.update)


// routing middlewarw-recruiters
app.post('/api/recruiters/profile',authenticationUser,authorizedUser(['recruiter']),checkSchema( recruiterValidationSchema ),recruiterCltr.create)
app.get('/api/recruiters/profile',authenticationUser,authorizedUser(['recruiter']),recruiterCltr.show)
app.put('/api/recruiters/profile',authenticationUser,authorizedUser(['recruiter']),checkSchema(recruiterEditValidationSchema),recruiterCltr.update)


// jobs
app.post('/api/jobs',authenticationUser,authorizedUser(['recruiter']),checkSchema(jobValidationSchema),jobsCltr.create)
app.get('/api/jobs',jobsCltr.list)
app.get('/api/jobs/my', authenticationUser, authorizedUser(['recruiter']), jobsCltr.my)
app.get('/api/jobs/:id',jobsCltr.show)
app.get('/api/jobs/:id/applications',authenticationUser,authorizedUser(['recruiter']),jobsCltr.applications)
app.get('/api/jobs/:id/applications/:appId',authenticationUser,authorizedUser(['recruiter']),jobsCltr.singleApplication)
app.put('/api/jobs/:id/applications/:appId',authenticationUser,authorizedUser(['recruiter']),jobsCltr.applicationUpdate)

app.put('/api/jobs/:id',authenticationUser,authorizedUser(['recruiter']),checkSchema(jobValidationSchema),jobsCltr.udpate)
app.delete('/api/jobs/:id',authenticationUser,authorizedUser(['recruiter']),jobsCltr.remove)


//applications

app.post('/api/applications',authenticationUser,authorizedUser(['candidate']),checkSchema(applicationValidationSchema),applicationCltr.apply)
app.get('/api/applications',authenticationUser,authorizedUser(['recruiter']),applicationCltr.list)
app.get('/api/applications/check/:jobId',authenticationUser,authorizedUser(['candidate','recruiter']),checkSchema(applicationValidationSchema),applicationCltr.check)

app.listen(port,()=>{
    console.log("server successfully running on ",port);
})