const User = require('../models/user-model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const usersCtrl = {};

usersCtrl.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    try {
        const salt = await bcryptjs.genSalt();
        const hashPassword = await bcryptjs.hash(body.password, salt);
        const user = new User(body);
        user.password = hashPassword;
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
usersCtrl.checkEmail = async(req,res)=>{
    const email= req.query.email
    try {
        const user= User.findOne({email})
        if(user){
            res.json({'is_registered_email':true})
        }
        else {
            res.json({'is_registered_email':false})
        }
    }
    catch(error){
        // console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }

}

// usersCtrl.login = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const body = req.body;
//     try {
//         const user = await User.findOne({ email: body.email });
//         if (!user) {
//             return res.status(404).json({ error: 'Invalid email or password' });
//         }
//         const isAuth = await bcryptjs.compare(body.password, user.password);
//         if (!isAuth) {
//             return res.status(404).json({ error: 'Invalid email or password' });
//         }
//         const tokenData = {
//             id: user._id,
//             role: user.role
//         };
//         const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' });

//         res.json({ token: token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// };
usersCtrl.login = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const body = req.body 
    try { 
        const user = await User.findOne({email: body.email }) 
        if(user) {
            const isAuth = await bcryptjs.compare(body.password, user.password)
            if(isAuth) {
                const tokenData = {
                    id: user._id,
                    role: user.role 
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d'})
               return  res.json({ token: token })
            }
            return res.status(404).json({ errors: 'invalid email / password '})
        }
        res.status(404).json({ errors: 'invalid email / password'})
    } catch(err) {
        res.status(500).json({ errors: 'something went wrong'})
    }
}

usersCtrl.accounts = async (req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        res.json(user)
    }
    catch(err){
        res.status(500).json({errors :"something went wrong"})
    }

}
module.exports = usersCtrl;
