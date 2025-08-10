import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import User from "../model/User";
import { config } from "dotenv";
import { resolve } from "path";
import { LoginData, RegisterData } from "../types/AuthTypes";
config({ path: resolve("./src/.env") });

class AuthService {
  async loginUser(data: LoginData) {
    try {
      const { emailOfUser, password } = data;
      const isUserExist = await User.findOne({ emailOfUser });
      if (isUserExist) {
        if (await compare(password, isUserExist.password)) {
          const token = sign(
            { userId: isUserExist._id },
            process.env.JWT_SECRET as string
          );
          return token;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } catch (error) {
      console.log("Error occurred in login service : ", error);
      throw new Error("Internal Server Error !!!");
    }
  }

  async registerUser(data: RegisterData) {
    try {
      const isUserExist = await User.findOne({ emailOfUser: data.emailOfUser });
      if (isUserExist) return 0; //Handle the user already case
      else {
        const newPassword = await hash(data.password, 12);
        const newUser = await User.create({ ...data, password: newPassword });
        const savedUser = await newUser.save();
        return savedUser;
      }
    } catch (error) {
      console.log("Error occurered in registerUser Service: ", error);
      throw new Error("Internal Server Error !!!");
    }
  }
}

export default AuthService;
