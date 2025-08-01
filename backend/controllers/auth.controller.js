import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, userName, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    // Hash the password
    const rounds=10;
    // password = String(req.body.password);
    const hashedPassword = await bcrypt.hash(password, rounds);

    // Create the user
    const user = await User.create({
      fullName,
      email,
      userName,
      password: hashedPassword,
      role,
    });

    // Exclude sensitive fields when returning
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.status(400).json({ message: "There was an error registering the user" });
    }

    return res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  
  const {email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid Email Or No user exists" });
    }
    const safeUser = await User.findById(user._id).select("-password");

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successfull",
      token,
      user:safeUser
     
      
    });
  } catch (error) {
    return res.status(404).json({ message: "Server error", error: error.message });
  }
};
