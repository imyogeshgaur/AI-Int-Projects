import { connect } from "mongoose";
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve("./src/.env") });
const connectToDB = async () => {
  try {
    await connect(process.env.DB_URL as string);
    console.log("Database Connected !!!");
  } catch (error) {
    console.log("Some error occurred in connecting MongoDB : ", error);
  }
};

export default connectToDB;
