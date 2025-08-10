import { verify } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { decodeRole } from "../helper/decodeUser";
export const authenticateAsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    verify(
      req.headers.authorization as string,
      process.env.JWT_SECRET as string
    );
    const role = await decodeRole(req.headers.authorization as string);
    if (role == "Admin") next();
  } catch (error) {
    console.log("Error occured in authenticate middleware !!!", error);
    return res.status(401).send({ message: "Not Authorized !!!" });
  }
};

export const authenticateAsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    verify(
      req.headers.authorization as string,
      process.env.JWT_SECRET as string
    );
    const role = await decodeRole(req.headers.authorization as string);
    if (role == "User") next();
  } catch (error) {
    console.log("Error occured in authenticate middleware !!!", error);
    return res.status(401).send({ message: "Not Authorized !!!" });
  }
};
