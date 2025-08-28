import db from "../db/db.js";
import { hashPassword, comparePassword } from "./passwordService.js";
import { generateToken } from "./tokenService.js";

export const createUser = async ({ name, email, password }) => {
  const existingUser = await db("users").where({ email }).first();
  if (existingUser) throw new Error("User already exists");

  const hashed = await hashPassword(password);
  const [id] = await db("users").insert({ name, email, password: hashed });
  return id;
};

export const loginUser = async ({ email, password }) => {
  const user = await db("users").where({ email }).first();
  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ id: user.id });
  return { user, token };
};
