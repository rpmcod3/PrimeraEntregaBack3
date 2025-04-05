import { Router } from "express";
import { userModel } from "../models/user.model.js";

const sessionRouter = Router();

sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await userModel.findOne({ email }).lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid password" });

    req.session.user = {
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    res.redirect("/profile");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", details: error });
  }
});

sessionRouter.post("/register", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;

  if (!first_name || !last_name || !age || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await userModel.create({
      first_name,
      last_name,
      age,
      email,
      password,
    });

    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", details: error });
  }
});

sessionRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

export default sessionRouter

