import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// @desc Register a user
// @route GET /api/users/register
// @access public

const registerUser= asyncHandler(async(req, res) => {
    const {username, email ,password} = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("Please fill all the fields");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists")
    }

    //Hash the password 
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:",hashedPassword)
    const user = await User.create(
        {
            username,
            email,
            password: hashedPassword,
        }
    );
    console.log(`user created ${user}`)

    if(user)
    {
        res.status(201).json({_id:user._id,email:user.email});
    }
    else
    {
        res.status(400);
        throw new Error("User data is not valid")
    }
    res.json({ message: "User Registered" });
})

// @desc Login
// @route GET /api/users/login
// @access public

const loginUser= asyncHandler(async(req, res) => {
    const {email,password} = req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findOne({email});
    //Compare password with hashed passsword
    if(user && (await bcrypt.compare(password,user.password)))
    {
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"})
        res.status(200).json({accessToken})
    }
    else
    {
        res.status(401)
        throw new Error("Email or password is not valid")
    }
})


// @desc Current user information
// @route GET /api/users/current
// @access private

const currentUser= asyncHandler(async(req, res) => {
    res.json(req.user);
})
export {registerUser,loginUser,currentUser};