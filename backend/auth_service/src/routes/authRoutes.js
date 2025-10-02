import express from 'express'
import { registerUser } from '../controllers/authControllers.js';
import { loginUser } from '../controllers/authControllers.js';
import {body} from 'express-validator'
import upload from '../middlewares/uploadMiddleware.js';


const router = express.Router();
const registerValidation = [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")

]

//For registering a user
router.post('/register',registerValidation,registerUser);
//For user logijn
router.post('/login', loginUser)
//For uploading images
router.post('/upload-image', upload.single('image'),(req,res)=>{
  if(!req.file){
    return res.status(400).json({message : "No file uploaded"})
  }
  //This will get us the local urls
  const imageURL = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({imageURL});
})





export default router;