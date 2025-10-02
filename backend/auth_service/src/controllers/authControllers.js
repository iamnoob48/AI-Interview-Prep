import prisma from "../prismaClient.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {validationResult} from 'express-validator'



// Generate a jwt token
const generateToken = (userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn : "24h"})

}

//Register a user
export const registerUser = async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array().map(err.msg)})
    }

    const {email,username,password, profilePicURL} = req.body;
    const hashedPassword = bcrypt.hashSync(password,8);

    try {
        const userExists = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(userExists){
            return res.status(400).json({message : "This user already exists"});
        }
        const user = await prisma.user.create({
            data : {
                email : email,
                password : hashedPassword,
                username : username,
                profilePic : profilePicURL
            }
        });
        const token = generateToken(user.id);
        res.status(201).json({token});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"});
        
    }


}

//For login user
export const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(!user){
            return res.status(401).json({message : "This user does not exist"})
        }
        const checkPass = bcrypt.compareSync(password, user.password);
        if(!checkPass){
            return res.status(401).json({message : "Invalid password"})
        }
        const token = generateToken(user.id);
        res.status(201).json({token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"})
        
    }
}

