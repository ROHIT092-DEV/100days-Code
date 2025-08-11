import express from "express";

export const signUp = async (req, res) => {
  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  )
    return res.staus(400).json({ message: "Filed can not be blank" });
};
