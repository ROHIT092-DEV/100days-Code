import express from "express";
import { Auth } from "../models/auth.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const signUp = async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log(fullName, email, username, password);

  // ✅ Basic validation
  if ([fullName, email, username, password].some((field) => !field?.trim())) {
    return res.status(400).json({ message: "Field can not be blank" });
  }

  try {
    // ✅ Check if user already exists
    const existedUser = await Auth.findOne({
      $or: [
        { username: username.trim().toLowerCase() },
        { email: email.trim().toLowerCase() },
      ],
    });

    if (existedUser) {
      return res
        .status(409)
        .json({ message: "User with email or username already exists" });
    }

    // ✅ Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // ✅ Create the new user
    const user = await Auth.create({
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      password: hashedPassword,
    });

    if (!user) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering the user" });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Sign in Process Here

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Save token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

      


    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Profile Page (me)

export const getMe = (req, res) => {
  res.status(200).json(req.user);

 
};






// Logout

export const logout = async(req, res) =>{
   res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.json({ message: "Logged out successfully" });
}
