import { Router,Request,Response } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/login",async(req:Request,res:Response)=>{
    try {
        const userController = new UserController(req,res);
        await userController.loginUser();
    } catch (error) {
        console.log("Error in user login route : ",error);
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

userRouter.post("/forgetPassword/:userId",async(req:Request,res:Response)=>{
    try {
        const userController = new UserController(req,res);
        await userController.forgetPassword();
    } catch (error) {
        console.log("Error in forget password route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

userRouter.post("/resetPassword/:userId",async(req:Request,res:Response)=>{
    try {
        const userController = new UserController(req,res);
        await userController.resetPassword();
    } catch (error) {
        console.log("Error in reset password route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})


export default userRouter;