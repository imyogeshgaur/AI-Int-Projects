import request from "supertest";
import app from "../server";

describe("POST /register", () => {
  it("User Created Sucessfully", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "dummy",
      email: "dummy@dummy.dummy",
      password: "Dummy@1234",
    });
    expect(res.body).toHaveProperty("user");
    expect(res.status).toBe(201);
  });
  it("User already Exist", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "dummy",
      email: "dummy@dummy.dummy",
      password: "Dummy@1234",
    });
    expect(res.body).toHaveProperty("message");
    expect(res.status).toBe(400);
  });
  it("User's email address is not there", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "dummy",
      email: "",
      password: "Dummy@1234",
    });
    expect(res.body.errors).toContain("Email Field is required !!!");
  });
  it("User's email address is valid", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "dummy",
      email: "dummy",
      password: "Dummy@1234",
    });
    expect(res.body.errors).toContain("Invalid Email address");
  });
  it("User's password is not there", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "dummy",
      email: "dummy@dummy.dummy",
      password: "",
    });
    expect(res.body.errors).toContain("Password length is too Short !!!");
  });
  it("User's password not contains capital letter", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "dummy",
      email: "dummy@dummy.dummy",
      password: "ummy@123",
    });
    expect(res.body.errors).toContain(
      "Password must contain at least one uppercase letter"
    );
  });
  it("User's password not contains small letter", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "dummy",
      email: "dummy@dummy.dummy",
      password: "DUMMY@123",
    });
    expect(res.body.errors).toContain(
      "Password must contain at least one lowercase letter"
    );
  });
  it("User's password not contains special character ", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "dummy",
      email: "dummy@dummy.dummy",
      password: "Dummy1234",
    });
    expect(res.body.errors).toContain(
      "Password must contain at least one special character (@$!%*?&)"
    );
  });
  it("User's password not contains number", async () => {
    const res = await request(app).post("/api/v1/user/register").send({
      name: "dummy",
      email: "dummy@dummy.dummy",
      password: "Dummy@",
    });
    expect(res.body.errors).toContain(
      "Password must contain at least one number"
    );
  });
});

describe("POST /login", () => {
  it("User login is sucessfull", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "dummy@dummy.dummy",
      password: "Dummy@1234",
    });
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });
  it("User Email not found", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "dummy@dummy.dum",
      password: "Dummy@1234",
    });
    expect(res.body.message).toContain("Invalid Credentials !!!");
  });
  it("User Password is incorrect", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "dummy@dummy.dummy",
      password: "Dummy@123",
    });
    expect(res.body.message).toContain("Invalid Credentials !!!");
  });
  it("User's email address is not there", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "",
      password: "Dummy@1234",
    });
    expect(res.body.errors).toContain("Email Field is required !!!");
  });
  it("User's email address is valid", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "dummy",
      password: "Dummy@1234",
    });
    expect(res.body.errors).toContain("Invalid Email address");
  });
  it("User's password is not there", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "dummy@dummy.dummy",
      password: "",
    });
    expect(res.body.errors).toContain("Password length is too Short !!!");
  });
  it("User's password not contains capital letter", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "dummy@dummy.dummy",
      password: "ummy@123",
    });
    expect(res.body.errors).toContain(
      "Password must contain at least one uppercase letter"
    );
  });
  it("User's password not contains small letter", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "dummy@dummy.dummy",
      password: "DUMMY@123",
    });
    expect(res.body.errors).toContain(
      "Password must contain at least one lowercase letter"
    );
  });
  it("User's password not contains special character ", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "dummy@dummy.dummy",
      password: "Dummy1234",
    });
    expect(res.body.errors).toContain(
      "Password must contain at least one special character (@$!%*?&)"
    );
  });
  it("User's password not contains number", async () => {
    const res = await request(app).post("/api/v1/user/login").send({
      email: "dummy@dummy.dummy",
      password: "Dummy@",
    });
    expect(res.body.errors).toContain(
      "Password must contain at least one number"
    );
  });
});

