import express from 'express'
import { addTask } from '../controllers/task.controller.js';

const router = express.Router()


router.post("/add-Task", addTask)

export default router;
