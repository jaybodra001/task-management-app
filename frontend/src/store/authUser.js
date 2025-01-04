import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  isAddTask: false,
  isShowTask: false,
  tasks: [],
  totalTasks: 0,  // Initialize with 0
  currentPage: 1,
  totalPages: 1,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
      return true;
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isAddTask: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },

  addTask: async (credentials) => {
    set({ isAddTask: true });
    try {
      const response = await axios.post("/api/v1/user/add-task", credentials);
      set({ user: response.data.user, isAddTask: false });
      toast.success("Task created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Task failed");
      set({ isAddTask: false, user: null });
    }
  },

 	 getAllTasks : async (page = 1, limit = 10) => {
	set({ isShowTask: true });
	try {
	  const response = await axios.get(`/api/v1/user/all-tasks?page=${page}&limit=${limit}`);
	  console.log('API Response for All Tasks:', response.data);
	  set({
		tasks: response.data.tasks,
		totalTasks: response.data.totalTasks,  // Ensure this is being set correctly
     	 totalPages: response.data.totalPages,// Ensure totalPages is returned
		isShowTask: false,
	  });
	} catch (error) {
	  toast.error(error.response.data.message || "Failed to load tasks");
	  set({ isShowTask: false, tasks: [], totalTasks: 0 });
	}
  },  
  

  getUserTasks: async (page = 1, limit = 10) => {
    set({ isShowTask: true });
    try {
      const response = await axios.get(`/api/v1/user/user-tasks?page=${page}&limit=${limit}`);
      set({
        tasks: response.data.tasks,
		totalTasks: response.data.totalTasks,  // Ensure this is being set correctly
		totalPages: response.data.totalPages,// Ensure totalTasks is set correctly
        isShowTask: false,
      });
    } catch (error) {
      toast.error(error.response.data.message || "Failed to load tasks");
      set({ isShowTask: false, tasks: [], totalTasks: 0 });
    }
  },
}));
