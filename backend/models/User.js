import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName:{
        "type":String,
        "required": true
    },
    email:{
        "type":String,
        "required":true,
        "unique":true
    },
    userName:{
        "type":String,
        "required":true,
        "unique":true
    },
    password:{
        "type":String,
        "required":true
    },
    role:{
        "type":String,
        "enum":["user","admin"],
        "default":"admin" // if no value is assigned that mongo db will asign user to it .
    }
})
export default mongoose.model("User",userSchema) // saved as User on schema