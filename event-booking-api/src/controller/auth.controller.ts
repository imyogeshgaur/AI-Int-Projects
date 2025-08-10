import { type Request, type Response } from "express";
import AuthService from "../service/auth.service";

class AuthController {
  private readonly req: Request;
  private readonly res: Response;
  private readonly service: AuthService;
  constructor(request: Request, response: Response) {
    this.req = request;
    this.res = response;
    this.service = new AuthService();
  }

  async loginUser() {
    try {
      const response = await this.service.loginUser(this.req.body);
      if (response == 0)
        return this.res
          .status(401)
          .send({ message: "Invalid Credentials !!!" });
      else return this.res.status(200).send({ message: response });
    } catch (error) {
      console.log("Error occured in the login Controller : ", error);
      this.res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }

  async registerUser() {
    try {
      const response = await this.service.registerUser(this.req.body);
      if (response == 0)
        return this.res.status(401).send({message:"User Aleady Exist !!!"});
      else return this.res.status(200).send({ user: response });
    } catch (error) {
      console.log("Error occured in the register Controller : ", error);
      this.res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }
}

export default AuthController;
