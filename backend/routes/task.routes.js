import { Router } from "express";
import { createTask , getOneTask , getAllUserTasks , deleteTask , updateTask , fileDownload } from "../controllers/task.controller.js"
import { verifyToken } from '../middlewares/auth.middleware.js';
import { upload } from "../middlewares/multer.middleware.js";
import { updateStatus } from "../controllers/task.controller.js";
const router = Router();

router.get("/download/:filename", verifyToken, fileDownload);
router.patch("/:id/status", verifyToken, updateStatus);

router.get("/", verifyToken, getAllUserTasks);
router.get("/:id", verifyToken, getOneTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

router.post("/", verifyToken, upload.array('attachments', 3), createTask);

export default router;
