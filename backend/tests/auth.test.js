// tests/auth.test.js
import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { describe, it, expect, afterAll } from "@jest/globals";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "StrongPassword123"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
