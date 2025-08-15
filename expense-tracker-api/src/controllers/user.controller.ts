import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve("./src/.env") });
import { Request, Response } from "express";
import User from "../models/User";
import { validateUserAtLogin, validateUserAtRegistration } from "../utils/validation";
import { loginUserDTO, registerUserDTO } from "../types/AuthDTO";

class UserController {
  private readonly req: Request;
  private readonly res: Response;

  constructor(request: Request, response: Response) {
    this.req = request;
    this.res = response;
  }

  async loginUser() {
    const data:loginUserDTO = this.req.body;
    try {
      const validation:any = validateUserAtLogin(data);
      if (validation?.errors?.length) {
        return this.res.status(400).send({ errors: validation.errors });
      }
      const isUserExist = await User.findOne({ email: data.email });
      if(!isUserExist) return this.res.status(400).send({ message:"Invalid Credentials !!!" });
      const match = await compare(data.password,isUserExist.password);
      if(!match) return this.res.status(400).send({ message:"Invalid Credentials !!!" });
      const accessToken = sign({userId:isUserExist._id},process.env.JWT_SECRET as string,{expiresIn:'1hr'});
      const refreshToken = sign({userId:isUserExist._id},process.env.JWT_SECRET as string,{expiresIn:'7d'});
      return this.res.status(200).send({accessToken,refreshToken})
    } catch (error) {
      console.log("Error in login service : ", error);
    }
  }

  async registerUser() {
  const data: registerUserDTO = this.req.body;
  try {
    const validation: any = validateUserAtRegistration(data);
    if (validation?.errors?.length) {
      return this.res.status(400).send({ errors: validation.errors });
    }
    const isUserExist = await User.findOne({ email: data.email });
    if (isUserExist) {
      return this.res.status(400).send({ message: "User already exists !!!" });
    }
    const newPassword = await hash(data.password, 10);
    const newUser = await User.create({ ...data, password: newPassword });
    return this.res.status(201).send({ user: newUser });
  } catch (error: any) {
    console.error("Error in register service:", error);
    return this.res.status(500).send({ error: error.message });
    }
  }

}

export default UserController;
