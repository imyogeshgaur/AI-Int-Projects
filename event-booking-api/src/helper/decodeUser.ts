import { decode } from "jsonwebtoken";
import User from "../model/User";
export const decodeRole = async (token: string) => {
  try {
    const value: any = decode(token, { complete: true });
    const user = await User.findById(value?.payload?.userId, { role: 1 });
    return user?.role;
  } catch (error) {
    console.log("Error in decoding user : ", error);
  }
};

export const decodeUser = async (token: string) => {
  try {
    const value: any = decode(token, { complete: true });
    const user = await User.findById(value?.payload?.userId, {
      emailOfUser: 1,
    });
    return user?.emailOfUser;
  } catch (error) {
    console.log("Error in decoding user : ", error);
  }
};
