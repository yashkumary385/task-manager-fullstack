import multer from "multer";
import path, { extname } from "path"
// import fs from "fs"
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // destination of the file 
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {// names the file 
        const ext = path.extname(file.originalname ) // finds the extension of the file 

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, uniqueSuffix + ext)
  }
})
console.log('multer hitt');
const fileFilter = async(req,file,cb)=>{ // checks that only pdf is allowed .
if(file.mimetype === "application/pdf"){
    cb(null,true)
   
}else{
    cb(new Error("Only pdf files are allowed"),false)
}
}
// export const upload = multer({ storage: storage })
export const upload = multer({
  storage,
  fileFilter,
  limits: { files: 3 }
});