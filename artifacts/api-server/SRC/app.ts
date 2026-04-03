import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET || "l2int-secret"));

const sessions: Record<string, { authenticated: boolean; login: string }> = {};

app.use((req: any, _res, next) => {
  const token = req.cookies?.["session_token"];
  if (token && sessions[token]) {
    req.session = sessions[token];
  } else {
    req.session = null;
  }
  req._sessions = sessions;
  next();
});

app.use("/api", router);

export default app;
