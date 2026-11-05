import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

await mongoose.connect("mongodb://127.0.0.1:27017/simpleauth");
console.log("Connected to MongoDB");


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String},
    pass: { type: String},
  })
);

app.post("/register", async (req, res) => {
  console.log("body",req.body);
    const name = req.body.username;
    const pass = req.body.password;
    const tempuser = await User.create({ name, pass });
    console.log("TEMPUSER",tempuser);
    res.json({ message: "User created", id: tempuser._id });
});

app.post("/hello",async(req,res)=>{
  res.json({text:"Hi  " +req.body.user});
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ message: "Login OK", username: user.username });
});

app.listen(3000, () => console.log("Server on http://localhost:3000"));
