import { Request, Response } from "express";
import UserService from "../service/user.service";

class UserController {
  private readonly req: Request;
  private readonly res: Response;
  private readonly service: UserService;
  constructor(request: Request, response: Response) {
    this.req = request;
    this.res = response;
    this.service = new UserService();
  }
  async getAllEvents() {
    try {
      const response = await this.service.getAllEvents();
      return this.res.status(200).send({ message: response });
    } catch (error) {
      console.log("Error occurred at the getAllEvents controller : ", error);
      return this.res
        .status(500)
        .send({ message: "Internal serever error !!!" });
    }
  }

  async getSingleEvent() {
    try {
      const response = await this.service.getSingleEvent(
        this.req.params.eventId
      );
      return this.res.status(200).send({ message: response });
    } catch (error) {
      console.log("Error occurred at the getSingleEvent controller : ", error);
      return this.res
        .status(500)
        .send({ message: "Internal serever error !!!" });
    }
  }

  async getAllBookings() {
    try {
      const response = await this.service.getAllBookings(
        this.req.headers.authorization as string
      );
      return this.res.status(200).send({ message: response });
    } catch (error) {
      console.log("Error occurred at the getSingleEvent controller : ", error);
      return this.res
        .status(500)
        .send({ message: "Internal serever error !!!" });
    }
  }

  async bookTheEvent() {
    try {
      const response = await this.service.bookTheEvent(
        this.req.body.userId,
        this.req.params.eventId
      );
      return this.res.status(200).send({ message: response });
    } catch (error) {
      console.log("Error occurred at the getSingleEvent controller : ", error);
      return this.res
        .status(500)
        .send({ message: "Internal serever error !!!" });
    }
  }

  async deleteBooking() {
    try {
      const response = await this.service.deleteBooking(
        this.req.params.bookingId
      );
      return this.res.status(200).send({ message: response });
    } catch (error) {
      console.log("Error occurred at the getSingleEvent controller : ", error);
      return this.res
        .status(500)
        .send({ message: "Internal serever error !!!" });
    }
  }
}

export default UserController;
