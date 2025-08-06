const router = Router();

router.get("/download/:filename", verifyToken, fileDownload);
router.patch("/:id/status", verifyToken, updateStatus);

router.get("/", verifyToken, getAllUserTasks);
router.get("/:id", verifyToken, getOneTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

router.post("/", verifyToken, upload.array('attachments', 3), createTask);

export default router;
