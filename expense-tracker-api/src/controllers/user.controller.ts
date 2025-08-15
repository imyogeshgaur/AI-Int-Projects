import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";
import {
  validateUserAtLogin,
  validateUserAtRegistration,
} from "../validations/auth.validations";
import {
  loginUserDTO,
  registerUserDTO,
  resetPasswordDTO,
} from "../types/AuthDTO";
import { config } from "dotenv";
import { resolve } from "path";
import { sendforgetPasswordEmail } from "../utils/sendEmail";
config({ path: resolve("./src/.env") });

class UserController {
  private readonly req: Request;
  private readonly res: Response;

  constructor(request: Request, response: Response) {
    this.req = request;
    this.res = response;
  }

  async loginUser() {
    const data: loginUserDTO = this.req.body;
    try {
      const validation: any = validateUserAtLogin(data);
      if (validation?.errors?.length) {
        return this.res.status(400).send({ errors: validation.errors });
      }
      const isUserExist = await User.findOne({ email: data.email });
      if (!isUserExist)
        return this.res
          .status(400)
          .send({ message: "Invalid Credentials !!!" });
      const match = await compare(data.password, isUserExist.password);
      if (!match)
        return this.res
          .status(400)
          .send({ message: "Invalid Credentials !!!" });
      const accessToken = sign(
        { userId: isUserExist._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1hr" }
      );
      const refreshToken = sign(
        { userId: isUserExist._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );
      return this.res.status(200).send({ accessToken, refreshToken });
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
        return this.res
          .status(400)
          .send({ message: "User already exists !!!" });
      }
      const newPassword = await hash(data.password, 10);
      const newUser = await User.create({ ...data, password: newPassword });
      return this.res.status(201).send({ user: newUser });
    } catch (error: any) {
      console.error("Error in register service:", error);
      throw new Error(error);
    }
  }

  async forgetPassword() {
    const userId: string = this.req.params.userId;
    try {
      const isUserExist = await User.findById(userId);
      if (!isUserExist) {
        return this.res.status(200).send({ message: "User not exist !!!" });
      } else {
        const email = await sendforgetPasswordEmail(
          isUserExist.email,
          isUserExist.name
        );
        if (email == isUserExist.email)
          return this.res.status(200).send({
            message: "Email sent sucessfully !!",
          });
        return this.res.status(200).send({
          message: "Some issue occurred in sending email !!",
        });
      }
    } catch (error: any) {
      console.log("Error occured in forget password service ", error);
      throw new Error(error);
    }
  }

  async resetPassword() {
    const userId: string = this.req.params.userId;
    const data: resetPasswordDTO = this.req.body;
    try {
      const isPasswordMatch = data.confirmPassword === data.password;
      if (!isPasswordMatch)
        return this.res
          .status(200)
          .send({ message: "Password do not match !!!" });
      const newPassword = await hash(data.password, 10);
      const updatedUser = await User.findByIdAndUpdate(userId, {
        password: newPassword,
      });
      if (updatedUser)
        return this.res
          .status(200)
          .send({ message: "Password Reset Sucessfully !!!" });
      else
        return this.res
          .status(200)
          .send({ message: "Password Reset Failed !!!" });
    } catch (error: any) {
      console.log("Error occured in reset password service ", error);
      throw new Error(error);
    }
  }
}

export default UserController;
