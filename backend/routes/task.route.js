import express from 'express'
import { addTask, deleteTask, updateTask } from '../controllers/task.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router()

router.post("/add-Task", protectRoute,addTask)

router.put("/update-task/:id", protectRoute, updateTask)

router.delete("/delete-task/:id", protectRoute, deleteTask)

export default router;
