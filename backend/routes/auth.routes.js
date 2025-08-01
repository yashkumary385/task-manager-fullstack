import { Router } from "express";
// import { verifyToken } from '../middleware/auth.middleware.js';
import { register , login} from "../controllers/auth.controller.js";
const router = Router();
router.post("/register",register)
router.post("/login",login)
export default router