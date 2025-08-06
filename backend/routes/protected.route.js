import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user
  });
});

export default router;
