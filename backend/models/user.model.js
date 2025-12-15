import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  role: String // "user" or "admin"
});

export default mongoose.model("User", userSchema);
