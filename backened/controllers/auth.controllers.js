import express from "express";
import { Auth } from "../models/auth.models.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log(fullName, email, username, password)

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
