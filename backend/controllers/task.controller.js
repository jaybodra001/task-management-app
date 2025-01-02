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