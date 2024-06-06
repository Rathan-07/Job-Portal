const Candidate = require('../models/candidate-model')
const candidateValidationSchema = {
    userId: {
        custom: {
            options: async function(value, { req }){
                const candidate = await Candidate.findOne({ userId: req.user.id })
                if(candidate) {
                    throw new Error('Profile already created')
                } else {
                    return true 
                }
            }
        }
    },
    firstname: {
        in: ['body'],
        exists: {
            errorMessage: 'first name is required'
        },
        notEmpty: {
            errorMessage: 'first name cannot be empty'
        },
        trim: true 
    },
    lastname: {
        in: ['body'],
        exists: {
            errorMessage: 'last name is required'
        },
        notEmpty: {
            errorMessage: 'last name cannot be empty'
        },
        trim: true 
    },
    mobile: {
        in: ['body'],
        exists: {
            errorMessage: 'mobile is required'
        },
        notEmpty: {
            errorMessage: 'mobile cannot be empty'
        },
        isNumeric: {
            errorMessage: 'mobile should be a number'
        }, 
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'mobile should be 10 digits long'
        },
        custom: {
            options: async function(value){
                const candidate = await Candidate.findOne({ mobile: value})
                if(candidate) {
                    throw new Error('Mobile already exists')
                } else {
                    return true 
                }
            }
        },
        trim: true 
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

const candidateEditValidationSchema = {
    // Validation schema for editing an existing candidate profile
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: 'first name is required'
        },
        notEmpty: {
            errorMessage: 'first name cannot be empty'
        },
        trim: true 
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: 'last name is required'
        },
        notEmpty: {
            errorMessage: 'last name cannot be empty'
        },
        trim: true 
    },
    mobile: {
        in: ['body'],
        exists: {
            errorMessage: 'mobile is required'
        },
        notEmpty: {
            errorMessage: 'mobile cannot be empty'
        },
        isNumeric: {
            errorMessage: 'mobile should be a number'
        }, 
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'mobile should be 10 digits long'
        },
        custom: {
            options: async function(value, { req }) {
                // Check if the provided mobile number is already registered for a different candidate
                const candidate = await Candidate.findOne({ mobile: value, userId: { $ne: req.user.id }});
                // console.log(candidate)
                if (candidate) {
                    throw new Error('Mobile number already exists for another candidate. Please use a different number.');
                } else {
                    return true;
                }
            }
        },
        trim: true 
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
};

module.exports = {
    candidateValidationSchema,
    candidateEditValidationSchema
}