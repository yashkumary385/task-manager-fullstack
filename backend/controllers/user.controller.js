import User from "../models/User.js";
//pagination on backend done
// filtering and sorting also
export const getUsers = async (req, res) => {
    const query ={};
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const skip = (page -1)*limit;
    const {role} = req.query;
    let sortBy = {createdAt :-1}
    {req.query.sort == "old"} {sortBy = {createdAt :1}}
    if (req.user.role !== "admin") {
        return res.status(404).json({ message: " You are not authorized to check all the users" })
    }
    if(role){
        query.role = role.toLowerCase()
    }
    try {
        const users = await User.find(query).sort(sortBy).skip(skip).limit(limit).select("-password")
        return res.status(200).json({ message: "Here are all your users ", users })
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }

}

export const getOneUser = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(404).json({ message: " You are not authorized to check user" })
    }
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password")
        return res.status(200).json({message: " Here is your user" , user})
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

export const getCurrentUser = async(req,res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({message:"Invalid User"})
        }
        return res.status(200).json({message: " Here is your user" , user})

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


// controllers/user.controller.js


export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedFields = {
      userName: req.body.userName,
      fullName:req.body.fullName,
      email: req.body.email,
      role: req.body.role,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message:"User updated",user:updatedUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Failed to update user."});
  }
};



// controllers/user.controller.js
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message:"User not found."});
    }
    res.status(200).json({ message:"User deleted."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Failed to delete user."});
  }
};


export const getNonAdminUsers = async (req, res) => {
    const query = { role: { $ne: "admin" } }; // exclude admins
    

    let sortBy = { createdAt: -1 };
    if (req.query.sort === "old") {
        sortBy = { createdAt: 1 };
    }

    try {
        const users = await User.find(query)
            .sort(sortBy)
            .select("-password");

        return res.status(200).json({
            message: "Here are all users except admins",
            users,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};