import { Task } from "../models/task.model.js"

export async function getUserTasks(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 tasks per page
        const skip = (page - 1) * limit;

        const tasks = await Task.find({ userId: req.user._id })
            .skip(skip)
            .limit(Number(limit));

        const totalTasks = await Task.countDocuments({ userId: req.user._id });
        const totalPages = Math.ceil(totalTasks / limit);

        res.status(200).json({ 
            success: true, 
            tasks, 
            currentPage: Number(page), 
            totalTasks, 
            totalPages, 
        });
    } catch (e) {
        console.error("Error in getUserTasks controller:", e.message);
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

  
export async function getAllTasks(req, res) {
    try {
        if (req.user.role == "admin") {
            return res.status(403).json({ success: false, message: "Access denied!" });
        }

        const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 tasks per page
        const skip = (page - 1) * limit;

        const tasks = await Task.find()
            .skip(skip)
            .limit(Number(limit));

        const totalTasks = await Task.countDocuments();
        const totalPages = Math.ceil(totalTasks / limit);

        res.status(200).json({ 
            success: true, 
            tasks, 
            currentPage: Number(page),
            totalTasks, 
            totalPages,
        });
    } catch (e) {
        console.error("Error in getAllTasks controller:", e.message);
        res.status(500).json({ success: false, message: "Internal server error!" });
    }
}

  


export async function addTask(req, res) {
    try {
      const { title, description } = req.body;
  
      if (!title || !description) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
      }
  
      const newTask = new Task({
        title,
        description,
        userId: req.user._id, 
      });
  
      await newTask.save();
  
      res.status(201).json({ success: true, message: "Task created successfully!", task: newTask });
    } catch (e) {
      console.log("Error in addTask controller:", e.message);
      res.status(500).json({ success: false, message: "Internal server error!" });
    }
  }
  

export async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required!"
            });
        }

        if(!title){
            return res.status(400).json({success:false,message:"Title is reuired!!!"})
        }

        if(!description){
            return res.status(400).json({success:false,message:"description is reuired!!!"})
        }


        if (!title && !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are reuired!!!"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: { title, description } },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully!",
            task: updatedTask
        });
    } catch (e) {
        console.error("Error in updateTask controller:", e.message);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}

export async function taskCompOrNot(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log("status", status);

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required!"
            });
        }
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task status updated successfully!",
            task: updatedTask
        });
    } catch (e) {
        console.error("Error controller:", e.message);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}



export async function deleteTask(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required!"
            });
        }

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        })
    } catch (e) {
        console.error("Error in deleteTask controller:", e.message);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}
