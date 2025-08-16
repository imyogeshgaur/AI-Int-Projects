
export type AddExpenseDTO = {
  title: string;
  amount: number;
  category: string;
  description?: string;
}

export type AddExpenseEmailDTO = {
  name:string;
  email:string;
  title:string;
  amount: number;
  category: string;
}

export type EditExpenseDto={
  title?:string;
  amount?: number;
  category?:string;
}

export type filterInputDto = {
  fromDate:Date,
  toDate:Date
}