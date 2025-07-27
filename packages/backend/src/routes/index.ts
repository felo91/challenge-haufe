import { Router } from "express";
import authRoutes from "./auth";
import characterRoutes from "./characters";

const router = Router();

router.use("/auth", authRoutes);
router.use("/characters", characterRoutes);

export default router;
