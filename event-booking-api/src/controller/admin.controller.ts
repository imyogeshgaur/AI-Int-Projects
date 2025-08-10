import {Response, Request} from 'express';
import AdminService from '../service/admin.service';

class AdminController {
  private readonly req: Request;
  private readonly res: Response;
  private readonly service:AdminService; 
  constructor(request: Request, response: Response) {
    this.req = request;
    this.res = response;
    this.service = new AdminService();
  }

  async createEvent() {
    try {
      const response = await this.service.createEvent(this.req.body);
      return this.res.status(200).send({ message: response });
    } catch (error) {
      console.log("Error occurred in the createEvent Controller: ", error);
      return this.res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }  

  async updateEvent() {
    try {
      const eventId = this.req.params.id;
      const response = await this.service.updateEvent(eventId, this.req.body);
      return this.res.status(200).send({ message: response });
    } catch (error) {
      console.log("Error occurred in the updateEvent Controller: ", error);
      return this.res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }

  async deleteEvent() {
    try {
      const eventId = this.req.params.id;
      const response = await this.service.deleteEvent(eventId);
      return this.res.status(200).send({ message: response });
    } catch (error) {
      console.log("Error occurred in the deleteEvent Controller: ", error);
      return this.res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }
}

export default AdminController;