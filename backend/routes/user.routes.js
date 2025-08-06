import { Router } from "express";
import {
  getUsers,
  getOneUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  getNonAdminUsers,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/allUsers", verifyToken, getUsers);
router.get("/profile", verifyToken, getOneUser); // 
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);
router.get("/current-user", verifyToken, getCurrentUser);
router.get("/getAll", verifyToken, getNonAdminUsers);

export default router;
