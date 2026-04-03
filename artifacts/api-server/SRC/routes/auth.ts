import { Router } from "express";
import { LoginBody } from "@workspace/api-zod";
import { ADMIN_LOGIN, ADMIN_PASSWORD } from "../config/admin.js";

const router = Router();

const sessions = new Set<string>();

function generateToken(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

router.post("/auth/login", (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const { login, password } = parsed.data;
  if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
    const token = generateToken();
    sessions.add(token);
    res.cookie("admin_token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.json({ ok: true, role: "admin" });
  } else {
    res.status(401).json({ error: "Неверный логин или пароль" });
  }
});

router.post("/auth/logout", (req, res) => {
  const token = req.cookies?.admin_token;
  if (token) {
    sessions.delete(token);
  }
  res.clearCookie("admin_token");
  res.json({ message: "Logged out" });
});

router.get("/auth/me", (req, res) => {
  const token = req.cookies?.admin_token;
  if (token && sessions.has(token)) {
    res.json({ ok: true, role: "admin" });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

export { sessions };
export default router;
