import { Router,type Request,type Response } from "express";
const authRouter = Router();

authRouter.post("/login",async(req:Request,res:Response)=>{
    try {
        
    } catch (error) {
        console.log("Login Route Error : ",error);
        res.status(500).send({message:"Internal Server Error !!!"})
    }
})
authRouter.post("/register",async(req:Request,res:Response)=>{
    try {
        
    } catch (error) {
        console.log("Register Route Error : ",error);
        res.status(500).send({message:"Internal Server Error !!!"})
    }
})

export default authRouter;