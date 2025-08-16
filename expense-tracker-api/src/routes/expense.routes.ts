import { Router,Request,Response } from "express";
import { authenticateUser } from "../middleware/authenticate";
import ExpenseController from "../controllers/expense.controller";
const expenseRoute = Router();

expenseRoute.get("/expenses",[authenticateUser],async(req:Request,res:Response)=>{
    try {
        const expenseController = new ExpenseController(req,res);
        await expenseController.getAllExpense();
    } catch (error) {
        console.log("Error in forget password route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

expenseRoute.get("/expenses/:category",[authenticateUser],async(req:Request,res:Response)=>{
    try {
        const expenseController = new ExpenseController(req,res);
        await expenseController.getExpensesByCategory();
    } catch (error) {
        console.log("Error in forget password route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

expenseRoute.get("/filter",[authenticateUser],async(req:Request,res:Response)=>{
    try {
        const expenseController = new ExpenseController(req,res);
        await expenseController.filerExpense();
    } catch (error) {
        console.log("Error in forget password route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

expenseRoute.get("/summary",[authenticateUser],async(req:Request,res:Response)=>{
    try {
        const expenseController = new ExpenseController(req,res);
        await expenseController.summaryOfExpenses();
    } catch (error) {
        console.log("Error in forget password route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

expenseRoute.post("/add",[authenticateUser],async(req:Request,res:Response)=>{
    try {
        const expenseController = new ExpenseController(req,res);
        await expenseController.addExpense();
    } catch (error) {
        console.log("Error in forget password route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

expenseRoute.put("/edit/:expenseId",[authenticateUser],async(req:Request,res:Response)=>{
    try {
        const expenseController = new ExpenseController(req,res);
        await expenseController.editExpense();
    } catch (error) {
        console.log("Error in forget password route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

expenseRoute.delete("/delte/:expenseId",[authenticateUser],async(req:Request,res:Response)=>{
    try {
        const expenseController = new ExpenseController(req,res);
        await expenseController.deleteExpense();
    } catch (error) {
        console.log("Error in forget password route : ",error);
        return res.status(500).send({message:"Internal Server Error !!!"})
    }
})

export default expenseRoute;