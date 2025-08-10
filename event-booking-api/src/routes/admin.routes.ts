import { Router, type Request, type Response } from "express";
import { authenticateAsAdmin } from "../middleware/Authenticate";
import AdminController from "../controller/admin.controller";
const adminRouter = Router();

adminRouter.post(
  "/events",
  [authenticateAsAdmin],
  async (req: Request, res: Response) => {
    try {
      const adminController = new AdminController(req, res);
      await adminController.createEvent();
    } catch (error) {
      console.log("Create event Route Error : ", error);
      res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }
);

adminRouter.put(
  "/events/:id",
  [authenticateAsAdmin],
  async (req: Request, res: Response) => {
    try {
      const adminController = new AdminController(req, res);
      await adminController.updateEvent();
    } catch (error) {
      console.log("Update event Route Error : ", error);
      res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }
);

adminRouter.delete(
  "/events/:id",
  [authenticateAsAdmin],
  async (req: Request, res: Response) => {
    try {
      const adminController = new AdminController(req, res);
      await adminController.deleteEvent();
    } catch (error) {
      console.log("Delete event Route Error : ", error);
      res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }
);

export default adminRouter;
