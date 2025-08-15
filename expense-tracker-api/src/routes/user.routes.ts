import { Router,Request,Response } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/login",async(req:Request,res:Response)=>{
    try {
        const userController = new UserController(req,res);
        await userController.loginUser();
    } catch (error) {
        console.log("Error in user registration route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

userRouter.post("/register",async(req:Request,res:Response)=>{
    try {
        const userController = new UserController(req,res);
        await userController.registerUser();
    } catch (error) {
        console.log("Error in user registration route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

export default userRouter;