import prisma from "../prismaClient.js";
import { producer } from "../server.js";

export const userInfo = async (req,res) =>{
    const userId = req.userId
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : parseInt(userId)
            },
            select : {
                id : true,
                email : true,
                username : true,
                profilePic : true,
                role : true
            }
        })
        await producer.send({
            topic : 'Authentication-successful',
            messages : [{value : JSON.stringify({userId})}]
        })
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"});
        
    }
}