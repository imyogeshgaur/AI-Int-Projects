import express,{urlencoded,json} from "express"
import {rateLimit} from "express-rate-limit"
import userRouter from "./routes/user.routes";
import connectToDB from "./config/db.config";
import expenseRoute from "./routes/expense.routes";
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
	ipv6Subnet: 56, 
});

app.use(limiter);
app.use(json());
app.use(urlencoded({extended:true}));

connectToDB();

app.use("/api/v1/user",userRouter);
app.use("/api/v1/expense",expenseRoute);

app.listen(4000);

export default app;