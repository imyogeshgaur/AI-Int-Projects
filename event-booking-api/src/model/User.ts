import { model, Schema } from "mongoose";

const userSchema = new Schema({
  nameOfUser: String,
  emailOfUser: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "User",
  },
  createdAt: Date,
});

const User = model("User", userSchema);
export default User;
