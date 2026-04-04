import fs from "fs";
import path from "path";

function loadCredentials(): { login: string; password: string } {
  const credFile = path.resolve(process.cwd(), "credentials.txt");
  try {
    if (fs.existsSync(credFile)) {
      const content = fs.readFileSync(credFile, "utf-8");
      const loginMatch = content.match(/^ЛОГИН=(.+)$/m) || content.match(/^LOGIN=(.+)$/m);
      const passMatch = content.match(/^ПАРОЛЬ=(.+)$/m) || content.match(/^PASSWORD=(.+)$/m);
      const login = loginMatch ? loginMatch[1].trim() : "admin";
      const password = passMatch ? passMatch[1].trim() : "admin";
      return { login, password };
    }
  } catch {}
  return { login: "admin", password: "admin" };
}

const credentials = loadCredentials();

export const ADMIN_LOGIN = credentials.login;
export const ADMIN_PASSWORD = credentials.password;
