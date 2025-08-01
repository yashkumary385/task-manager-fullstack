import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,  
    },
    priority:{
        type:String,
        enum:["low","medium","high"] ,default : "medium"
    },
    status:{
        type:String,
        enum:["pending", "in-progress","completed"], default:"pending"
    },
    dueDate:Date,
    assigned_to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    created_by:{
          type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   attachments: {
  type: [String], 
  default: []     
}
},{timestamps:true})
export default mongoose.model("Task",taskSchema)