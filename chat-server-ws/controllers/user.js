const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../dbconnect');


const registerUser = async (req, res, next) => {
    console.log(req.body)
    const {name, email, mobile, password} = req.body;
    console.log("User", req.body)
    const existingEmail = await User.findOne({ email });
    const existingMobile = await User.findOne({ mobile });
    if(existingEmail  || existingMobile){
        res.status(403).json({
            message: `${!existingEmail ? "Mobile" : "Email"} already in use`,
            data: existingEmail ? email : mobile
        })
    }
    try {
        const newUser = new User({name, email, mobile, password});
        await newUser.save();
        res.status(201).json({
            message: "User created successfully."
        })
    } catch (err) {
        res.status(400).json({
            message: "Error creating new user."
        })
        next(err)
    }
};

const loginUser = async(req, res, next) => {
    const {email,mobile, name, password} = req.body;
    console.log(email,password);
    const user = await User.findOne({email});
    if(!user) {
        res.status(403).json({
            message: `${email} is not registered`,
            data: email
        })
    }
    const isValid = await user.isPasswordValid(password);
    if(!isValid)
        return res.status(403).json({ error: { message: 'Invalid email/password' } });
    const token = getSignedToken(user);
    res.status(200).json({ data:{name:user.name, email:user.email, mobile:user.mobile}, token }); 
};
 
getSignedToken = user => {
    return jwt.sign({
        email: user.email,
        name: user.firstName,
    }, secretKey, { expiresIn: '1h' });

};

module.exports = {
    registerUser,
    loginUser
}