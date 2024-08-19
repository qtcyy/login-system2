import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { useState } from "hono/jsx";
//@ts-ignore
import pool from "../db/db.ts";
import { RowDataPacket } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = new Hono();

const [users, setUsers] = useState([
  { id: 1, admin: "qtcyy", password: "123456" },
  { id: 2, admin: "lx", password: "112233" },
  { id: 3, admin: "niao", password: "niaodanshao" },
]);
let nextId = 4;

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/data", (c) => {
  console.log("get data");
  return c.json({ message: "Hello,world" });
});

app.get("/api/data2", (c) => {
  console.log("get data2");
  return c.json({ message: "Happy" });
});

app.get("/api/data3", (c) => {
  console.log("get data3");
  return c.json({ message: "AAAAAAAAAA" });
});

app.get("api/data4", (c) => {
  console.log("get data4");
  return c.json({ message: "BBBBBBBBBBB" });
});

app.get("/api/current-time", (c) => {
  console.log("get-current-time");
  const currentTime = new Date().toISOString();
  return c.json({ currentTime });
});

app.get("/api/get-info", async (c) => {
  const [result] = await pool.query("select * from users");
  console.log(result);
  return c.json(result);
});

type USERTYPE = {
  ADMIN: "admin";
  PASSWD: "password";
};

interface User extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}

app.post("api/login", async (c) => {
  const { admin, password } = await c.req.json();
  console.log(`Admin: ${admin}, Password: ${password}`);
  /*
  const checking = users.find((user) => user.admin === admin);
  return c.json({
    id: checking?.id,
    check: checking?.password === password,
  });
  */
  try {
    const [result] = await pool.query<User[]>(
      "select * from users where username=?",
      admin
    );
    if (result[0].password === password) {
      console.log(result[0]);
      return c.json({
        id: String(result[0].id),
        check: true,
        message: "login success",
      });
    } else {
      return c.json({
        check: false,
        message: "login failed",
      });
    }
  } catch (error) {
    console.log("login error" + error);
    return c.json({ error: error }, 500);
  }
});

app.post("api/register", async (c) => {
  const { admin, password } = await c.req.json();
  if (!admin || !password) {
    return c.json({ error: "Username and password are required" }, 400);
  }
  console.log(`get register info: Admin: ${admin}, Password: ${password}`);

  try {
    await pool.query("insert into users (username,password) values(?,?)", [
      admin,
      password,
    ]);
    const [result] = await pool.query<User[]>(
      "select id from users where username=?",
      admin
    );
    return c.json({
      message: "User registered successfully",
      userId: result[0].id,
    });
  } catch (error) {
    console.error("Insert info error:" + error);
    return c.json({ error: "Failed to register" }, 500);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
