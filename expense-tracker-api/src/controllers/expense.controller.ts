import { Request, Response } from "express";
import { decodeTheUser } from "../utils/decodeUser";
import Expense from "../models/Expense";
import {
  AddExpenseDTO,
  AddExpenseEmailDTO,
  EditExpenseDto,
  filterInputDto,
} from "../types/ExpenseDTO";
import { sendExpenseAddedEmail } from "../utils/sendEmail";
import User from "../models/User";
import { validateExpenseAdded } from "../validations/expense.validations";

class ExpenseController {
  private readonly req: Request;
  private readonly res: Response;
  constructor(request: Request, response: Response) {
    this.req = request;
    this.res = response;
  }

  getUserIdFromToken(authToken: any): string {
    const token: string = authToken?.split(" ")[1];
    return decodeTheUser(token);
  }

  async getExpensesByCategory() {
    try {
      const userId: string = this.getUserIdFromToken(
        this.req.headers.authorization
      );
      const category: string = this.req.params.category;
      const fromDate: Date = this.req.body?.fromDate;
      const expensesByCategory = await Expense.find({
        userId,
        category,
        date: { $gte: new Date(fromDate) },
      }).limit(10);
      if (expensesByCategory.length == 0)
        return this.res.status(200).send({ message: "No Expense Found" });
      else return this.res.status(200).send({ expensesByCategory });
    } catch (error: any) {
      console.log("Error occured in expense category service ", error);
      throw new Error(error);
    }
  }

  async getAllExpense() {
    try {
      const userId: string = this.getUserIdFromToken(
        this.req.headers.authorization
      );
      const fromDate: Date = this.req.body.fromDate;
      const expensesOfUser = await Expense.find({
        userId,
        date: { $gte: new Date(fromDate) },
      }).limit(10);
      if (expensesOfUser.length == 0)
        return this.res.status(200).send({ message: "No Expense Found" });
      return this.res.status(200).send({ expensesOfUser });
    } catch (error: any) {
      console.log("Error occured in add expense service ", error);
      throw new Error(error);
    }
  }

  async filerExpense() {
    try {
      const userId: string = this.getUserIdFromToken(
        this.req.headers.authorization
      );
      const { fromDate, toDate }: filterInputDto = this.req.body;
      const filteredExpense = await Expense.find({
        userId,
        date: { $gte: new Date(fromDate), $lte: new Date(toDate) },
      }).limit(10);
      if (filteredExpense.length == 0)
        return this.res.status(200).send({ message: "No Expense Found" });
      return this.res.status(200).send({ filteredExpense });
    } catch (error: any) {
      console.log("Error occured in add expense service ", error);
      throw new Error(error);
    }
  }

  async summaryOfExpenses() {
    try {
      const userId: string = this.getUserIdFromToken(
        this.req.headers.authorization
      );
      const { fromDate, toDate }: filterInputDto = this.req.body;
      const from = new Date(fromDate);
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      const getAllExpensesSummary = await Expense.aggregate([
        {
          $match: {
            userId,
            date: { $gte: from.toISOString(), $lte: to.toISOString() },
          },
        },
        {
          $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" },
          },
        },
      ]).limit(10);
      return this.res.status(200).send({ getAllExpensesSummary });
    } catch (error: any) {
      console.log("Error occured in expense summary service ", error);
      throw new Error(error);
    }
  }

  async addExpense() {
    const data: AddExpenseDTO = this.req.body;
    try {
      const userId: string = this.getUserIdFromToken(
        this.req.headers.authorization
      );
      const user = await User.findById(userId);
      const validation: any = validateExpenseAdded(data);
      if (validation?.errors?.length) {
        return this.res.status(400).send({ errors: validation.errors });
      }
      const newExpence = await Expense.create({ ...data, userId });
      const expense = await newExpence.save();
      const emailProps: AddExpenseEmailDTO = {
        name: user?.name as string,
        email: user?.email as string,
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
      };
      sendExpenseAddedEmail(emailProps);
      return this.res.status(201).send({ expense });
    } catch (error: any) {
      console.log("Error occured in add expense service ", error);
      throw new Error(error);
    }
  }

  async editExpense() {
    try {
      const expenseId = this.req.params.expenseId;
      const data: EditExpenseDto = this.req.body;
      const updatedExpense = await Expense.findOneAndUpdate(
        { _id: expenseId },
        { ...data }
      );
      if (updatedExpense)
        return this.res
          .status(200)
          .send({ message: "Expense Updated Sucessfully !!!" });
      return this.res
        .status(200)
        .send({ message: "Expense Not Updated Sucessfully !!!" });
    } catch (error: any) {
      console.log("Error occured in edit expense service ", error);
      throw new Error(error);
    }
  }

  async deleteExpense() {
    try {
      const expenseId = this.req.params.expenseId;
      const deletedExpense = await Expense.findOneAndDelete({ _id: expenseId });
      if (deletedExpense)
        return this.res
          .status(200)
          .send({ message: "Expense deleted Sucessfully !!!" });
      return this.res
        .status(200)
        .send({ message: "Expense Not Deleted Sucessfully !!!" });
    } catch (error: any) {
      console.log("Error occured in delete expense service ", error);
      throw new Error(error);
    }
  }
}

export default ExpenseController;
