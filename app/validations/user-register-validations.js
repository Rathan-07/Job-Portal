const User = require('../models/user-model')
const UserRegisterValidationSchema = {
     username:{
        exists:{
            errorMessage:"username is required"
        },
        notEmpty:{
            errorMessage:"username field cannot be empty"
        },trim:true
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
                const user = await User.findOne({email:value})
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
     password:{
        exists:{
            errorMessage:"Password is required"
        },
        notEmpty:{
            errorMessage: " password field cannot be empty"
        },trim:true,
        isLength:{
            options:{min:5,max:128},
            errorMessage: 'password should be between 8 - 128 characters'

        }
     },
     role:{
        exists:{
            errorMessage:"role field cannot be empty"
        },
        notEmpty:{
            errorMessage:"role is required"
        },
        isIn: {
            options: [['candidate', 'recruiter']],
            errorMessage: 'role should either be a candidate or recruiter'
        }, 
        trim: true 


     }
    

}
module.exports = UserRegisterValidationSchema
