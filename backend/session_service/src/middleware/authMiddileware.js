import jwt from 'jsonwebtoken'

function authMiddleware (req,res,next){
    try {
        const headerToken = req.headers['authorization'];
        let token;

        //If it comes in bearer
        if(headerToken && headerToken.startsWith('Bearer')){
            token = headerToken.split(" ")[1];
        }else{
            token = token;
        }
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            if(err) {
                return res.status(401).json({message : "Not authorized"});
            }
            req.userId = decoded.id;
            next();
        })

        
    } catch (error) {
        
        res.status(401).json({message : "Invalid User"})
    }

}

export default authMiddleware