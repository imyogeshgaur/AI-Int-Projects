import request from "supertest";
import app from "../server";

describe("POST /add", () => {
  it("Add the expense sucessfully", async () => {
    const res = await request(app).post("/api/v1/expense/add").send({
      title: "DUMMY",
      category: "Food",
      amount: 100,
    });
    expect(res.body).toHaveProperty("expense");
  });
  it("Add the product without category", async () => {
    const res = await request(app).post("/api/v1/expense/add").send({
      title: "DUMMY",
      amount: 100,
    });
    expect(res.body).toHaveProperty("expense");
  });
  it("The Product amount is not a number", async () => {
    const res = await request(app).post("/api/v1/expense/add").send({
      title: "DUMMY",
      amount: 100,
    });
    expect(res.body).toHaveProperty("errors");
  });
});

describe("PUT /edit", () => {
  it("Edit the expense sucessfully", async () => {
    const res = await request(app).put("/api/v1/expense/edit").send({
      title: "DUMMYNEXT",
      category: "Travel",
    });
    expect(res.body.message).toContain("Expense Updated Sucessfully !!!");
  });
});

describe("GET /expenses", () => {
  it("Get all expenses of user", async () => {
    const res = await request(app).put("/api/v1/expense/edit").send({
      fromDate: "2025-01-01",
    });
    expect(res.body).toHaveProperty("expensesOfUser");
  });
});

describe("GET /expenses/:category", () => {
  it("Get all expenses of user by category", async () => {
    const res = await request(app).put("/api/v1/expense/edit").send({
      category: "Food",
      fromDate: "2025-01-01",
    });
    expect(res.body).toHaveProperty("expensesByCategory");
  });
});

describe("GET /filter", () => {
  it("Filter the expense of user by date", async () => {
    const res = await request(app).put("/api/v1/expense/edit").send({
      fromDate: "2025-01-01",
      toDate: "20205-08-16",
    });
    expect(res.body).toHaveProperty("filteredExpense");
  });
});

describe("GET /summary", () => {
  it("Summar of the expenses of user till a date", async () => {
    const res = await request(app).put("/api/v1/expense/edit").send({
      fromDate: "2025-01-01",
      toDate: "20205-08-16",
    });
    expect(res.body).toHaveProperty("getAllExpensesSummary");
  });
});
