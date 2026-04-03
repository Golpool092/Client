import { Router } from "express";
import { ADMIN_LOGIN, ADMIN_PASSWORD } from "../config/admin.js";
import crypto from "crypto";

const router = Router();

router.post("/login", (req: any, res) => {
  const { login, password } = req.body as { login?: string; password?: string };

  if (!login || !password) {
    res.status(400).json({ error: "Login and password are required" });
    return;
  }

  if (login !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  req._sessions[token] = { authenticated: true, login };

  res.cookie("session_token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });

  res.json({ authenticated: true, login });
});

router.post("/logout", (req: any, res) => {
  const token = req.cookies?.["session_token"];
  if (token && req._sessions) {
    delete req._sessions[token];
  }
  res.clearCookie("session_token");
  res.json({ message: "Logged out" });
});

router.get("/me", (req: any, res) => {
  if (req.session?.authenticated) {
    res.json({ authenticated: true, login: req.session.login });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

export default router;
