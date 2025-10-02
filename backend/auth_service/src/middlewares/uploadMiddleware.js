import multer from 'multer'

//Configure storage using multer for image file uploads
const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads/');

    },
    filename : (req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

//Filter image files by types
const fileFilter = (req,file,cb)=>{
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Only files of type .png, .jpeg, .jpg are allowed"), false);

    }
}

const upload = multer({storage, fileFilter});

export default upload;