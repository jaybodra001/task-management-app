import { Task } from "../models/task.model.js"

export async function addTask(req,res) {
    try{
        const {title,description} = req.body

        if(!title && !description){
            return res.status(400).json({success:false,message:"All fields are reuired!!!"})
        }

        if(!title){
            return res.status(400).json({success:false,message:"Title is reuired!!!"})
        }

        if(!description){
            return res.status(400).json({success:false,message:"description is reuired!!!"})
        }

        const newTask = new Task({
            title:title,
            description:description
        })

        
        await newTask.save()
        
        res.status(201).json({success:true,message:"Task created successfully!!!"})

    }catch(e){
        console.log("Error in SignUp controller:"+e.message)
        res.status(500).json({success:false,message:"Internal server error!!!"})


    }

}

export async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

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
