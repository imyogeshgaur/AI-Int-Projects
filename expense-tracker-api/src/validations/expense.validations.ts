import * as z from "zod"
import { AddExpenseDTO } from "../types/ExpenseDTO";

const expenseValidatons = z.object({
  title: z.string(),
  amount: z.number("Amount should be a number"),
  category: z.enum(["Food", "Transport", "Entertainment", "Shopping", "Bills", "Other"]),
  description:z.string()
})

export const validateExpenseAdded = (data:AddExpenseDTO)=>{
    try {
        const isParsed = expenseValidatons.parse(data);
        return isParsed;
    } catch (error) {
        if (error instanceof z.ZodError) {
              return {
                errors: error.issues.map((e: any) => {
                  return e.message;
                }),
              };
        }
    }
}