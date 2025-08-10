import { Router, type Request, type Response } from "express";
import { authenticateAsUser } from "../middleware/Authenticate";
const userRouter = Router();

userRouter.get("/events", async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("Error occurred in getting all the bookings : ", error);
    return res.status(500).send({ message: "Internal Server Error !!!" });
  }
});

userRouter.get("/events/:id", async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("Error occurred in getting events details : ", error);
    return res.status(500).send({ message: "Internal Server Error !!!" });
  }
});
userRouter.get(
  "/bookings",
  [authenticateAsUser],
  async (req: Request, res: Response) => {
    try {
    } catch (error) {
      console.log("Error occurred in fetching all bookings : ", error);
      return res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }
);
userRouter.post(
  "/bookings/:eventId",
  [authenticateAsUser],
  async (req: Request, res: Response) => {
    try {
    } catch (error) {
      console.log("Error occurred in creating bookings : ", error);
      return res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }
);

userRouter.delete(
  "/bookings/:id",
  [authenticateAsUser],
  async (req: Request, res: Response) => {
    try {
    } catch (error) {
      console.log("Error occurred in deleting the bookings : ", error);
      return res.status(500).send({ message: "Internal Server Error !!!" });
    }
  }
);

export default userRouter;
