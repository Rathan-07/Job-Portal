const Recruiter = require("../models/recruiter-model")


const recruiterValidationSchema = {
    userId:{
         custom:{
            options:async function(value,{req}){
                const recruiter = await Recruiter.findOne({userId:req.user.id})
                if(recruiter){
                    throw new Error("Profile already created")
                }
                return true
            }
         }
    },
    firstName:{
        in:['body'],
          exists:{
         errorMessage:"firstName field is required"
        },
        notEmpty:{
            errorMessage:"firstName cannot be empty"
        },trim:true,
    },
    email:{
        exists:{
            errorMessage: "email is required"
        },
        notEmpty:{
            errorMessage:" Email field cannot be empty"
        },
        isEmail:{
            errorMessage:"Email should be in valid format"
        },
        custom:{
            options: async function(value){
                const user = await Recruiter.findOne({email:value})
                if(user){
                    throw new Error("email is already exits")
                }
                else{
                    return true
                }
            }
        },trim: true,
        normalizeEmail: true 


     },
  
    mobile:{
        in:['body'],
          exists:{
         errorMessage:"mobile field is required"
        },
        notEmpty:{
            errorMessage:"mobile cannot be empty"
        },trim:true,
        isNumeric:{
            errorMessage:"mobile should be a number"
        },
        isLength:{
            options:{min: 10,max:10},
            errorMessage:"mobile should be 10 digits long"
        },
        custom:{
            options: async function(value){
                const recruiter =  await Recruiter.findOne({mobile:value})
                if(recruiter){
                    return new Error("mobile is already registerd")
                }
                return true
            },trim:true,

        },
        

    },

   
    companyWebiste:{
        in:['body'],
        exists:{
       errorMessage:"website field is required"
      },
      notEmpty:{
          errorMessage:"website cannot be empty"
      },trim:true,

    },

    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address is required'
        },
        notEmpty: {
            errorMessage: 'address cannot be empty'
        },
        trim: true 
    },
}

const recruiterEditValidationSchema = {
 
    firstName:{
        in:['body'],
          exists:{
         errorMessage:"firstName field is required"
        },
        notEmpty:{
            errorMessage:"firstName cannot be empty"
        },trim:true,
    },
    email:{
        exists:{
            errorMessage: "email is required"
        },
        notEmpty:{
            errorMessage:" Email field cannot be empty"
        },
        isEmail:{
            errorMessage:"Email should be in valid format"
        },trim:true,
        normalizeEmail: true 


     },

    mobile:{
        in:['body'],
          exists:{
         errorMessage:"mobile field is required"
        },
        notEmpty:{
            errorMessage:"mobile cannot be empty"
        },trim:true,
        isNumeric:{
            errorMessage:"mobile should be a number"
        },
        isLength:{
            options:{min: 10,max:10},
            errorMessage:"mobile should be 10 digits long"
        },
      

    },
    companyWebiste:{
        in:['body'],
        exists:{
       errorMessage:"website field is required"
      },
      notEmpty:{
          errorMessage:"website cannot be empty"
      },trim:true,

    },

    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address is required'
        },
        notEmpty: {
            errorMessage: 'address cannot be empty'
        },
        trim: true 
    }

}

module.exports = {
    recruiterValidationSchema,
    recruiterEditValidationSchema
}
