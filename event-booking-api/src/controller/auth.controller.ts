import { type Request,type Response } from "express";

class AuthController{
    private readonly req:Request;
    private readonly res:Response;
    constructor(request:Request,response:Response){
        this.req = request;
        this.res = response;
    }

    async loginUser(){
        try {
            const data = this.req.body;
        } catch (error) {
            console.log("Error occured in the login Controller : ",error);
            this.res.status(500).send({message:"Internal Server Error !!!"})
        }
    }

    async registerUser(){
        try {
            const data = this.req.body;
        } catch (error) {
            console.log("Error occured in the register Controller : ",error);
            this.res.status(500).send({message:"Internal Server Error !!!"})
        }
    }
}