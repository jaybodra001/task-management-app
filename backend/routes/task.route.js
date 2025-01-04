import express from 'express'
import { addTask, deleteTask, getAllTasks, getUserTasks, updateTask } from '../controllers/task.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router()

router.post("/add-Task", protectRoute,addTask)
router.get("/user-tasks", protectRoute, getUserTasks);
router.get("/all-tasks", protectRoute, getAllTasks);

router.put("/update-task/:id", protectRoute, updateTask)

router.delete("/delete-task/:id", protectRoute, deleteTask)

export default router;
