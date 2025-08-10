import express,{json,urlencoded} from "express"
import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import authRouter from "./routes/auth.routes";
import connectToDB from "./database/db.config";
const app = express();

connectToDB();

app.use(urlencoded({extended:true}))
app.use(json())

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/auth",authRouter);

app.listen(3000);