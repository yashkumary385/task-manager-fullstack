import Tasks from "../models/Task.js"
import path from "path"
import fs from "fs"
// import User from "../models/User.js";


export const createTask =async (req,res)=>{
    if(req.user.role !== "admin"){
        return res.status(404).json({message:"Only admins can assign task"})
    }
    try {
        
    const {title,description,status,priority,assigned_to, dueDate} =req.body;
    const attachmentsFiles = req.files?.map(file=> file.path)

   
   const newTask= await Tasks.create({
        title,
        description,
        status,
        priority,
        assigned_to,
        dueDate,
        created_by:req.user.id,
        attachments: attachmentsFiles
            // this is why we nedd to logoin so we know who created the task and id can be assigned
    })
    res.status(201).json({message:"task created succesfully",task:newTask})
    } catch (error) {
        return res.status(400).json({message:"error occured",error:error?.message})
    }
};


export const getAllUserTasks = async(req,res)=>{ // first we grab the user id and then 
    try{
    const userId = req.user.id;
    const query= {}
     let sortBy = {createdAt :-1};
    const {title, priority , status} = req.query;
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const skip = (page -1)*limit;
    {req.query.sort == "later"} sortBy= {createdAt :1};

  const filter = {
   $or:[
        {assigned_to :userId},
        {created_by :userId}
      ]
    ,
  }
   if(title){
    query.title=title;
   }
   if(priority){
    query.priority=priority;
   }
   if(title){
    query.status=status;
   }
  
    const tasks = await Tasks.find( // fetch these
    filter,
    {strictPopulate:false}
  ).sort(sortBy).skip(skip).limit(limit)
    .populate('assigned_to', 'username email') // needed in order to give email and username with ids 
    .populate('created_by', 'username email');
    res.status(200).json(tasks)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }

}

export const  getOneTask = async(req,res)=>{
    const taskId = req.params.id;

    try {
        const task = await Tasks.findById(taskId).populate('assigned_to', 'username email') 
    .populate('created_by', 'username email')
    if(!task){
        return res.status(404).json({message:" Task Id given is invalid"})
    }
    return res.status(200).json({message:"Here is your Task" , task})
    } catch (error) {
         return res.status(404).json({message :"Task not found" ,error: error})
    }
    


}
// update the given task
export const updateTask = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Only admins can update assigned task" });
  }

  try {
    const taskId = req.params.id;
    const task = await Tasks.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error: error.message });
  }
};



// delete task
export const deleteTask = async(req,res)=>{
 if(req.user.role !== "admin"){
        return res.status(404).json({message:"Only admins can delete assigned task"})
    }
try {
  const taskId = req.params.id;
const task = await Tasks.findById(taskId);
if(!task){
  res.send(404).json({message:"invalid task"})
}

  await task.deleteOne();

res.status(200).json({message:"deleted successfully"})
} catch (error) {
      res.status(400).json({message:"something went wrong",error:error.message})

}




}

 import fs from "fs";
import path from "path";

export const fileDownload = async (req, res) => {
  try {
    const filename = req.params[0]; 
    const filePath = path.join("uploads", filename);

    if (fs.existsSync(filePath)) {
      return res.download(filePath); // 
    } else {
      return res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || "Download error" });
  }
};

 // Change the status of a given task (admin-only)
export const updateStatus = async (req, res) => {
  
  try {
    const taskId = req.params.id;
    const { status } = req.body;

    if (!["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await Tasks.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


