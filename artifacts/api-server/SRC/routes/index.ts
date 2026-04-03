import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import adsRouter from "./ads";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(adsRouter);

export default router;
