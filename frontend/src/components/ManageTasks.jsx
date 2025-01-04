import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Auth/Footer';
import { useAuthStore } from '../store/authUser';
import toast from 'react-hot-toast';

const ManageTasks = () => {
  const {
    getAllTasks,
    getUserTasks,
    tasks = [], 
    isShowTask,
    totalTasks,
    user,
    updateTask,
    taskCompOrNot,
    deleteTask
  } = useAuthStore();

  console.log("userRole",user)

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const totalPages = Math.ceil(totalTasks / rowsPerPage);
  console.log({ totalTasks, rowsPerPage, totalPages });

  useEffect(() => {
    if (user.role === 'admin') {
      getAllTasks(currentPage, rowsPerPage);
    } else {
      getUserTasks(currentPage, rowsPerPage);
    }
  }, [currentPage, rowsPerPage, user, getAllTasks, getUserTasks]);

  if (!user) {
    return <div>Loading...</div>;
  }
  

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks
        .filter((task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title);
          }
          return b.title.localeCompare(a.title);
        })
    : [];

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = async () => {
    if (!editedTitle || !editedDescription) {
      toast.error('Title and description are required');
      return;
    }

    const updatedTask = {
      title: editedTitle,
      description: editedDescription,
    };

    try {
      await updateTask(editingTask._id, updatedTask);
      setEditingTask(null); 
      
      if(user.role === 'admin'){
        getAllTasks(currentPage, rowsPerPage)
      }else{
        getUserTasks(currentPage, rowsPerPage)
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId); 
      if(user.role === 'admin'){
        getAllTasks(currentPage, rowsPerPage)
      }else{
        getUserTasks(currentPage, rowsPerPage)
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task')
    }
  };
  
  const handleStatusChange = async (taskId, newStatus) => {
    const updatedTask = { status: newStatus };
    try {
      await taskCompOrNot(taskId, updatedTask); 
      if(user.role === 'admin'){
        getAllTasks(currentPage, rowsPerPage)
      }else{
        getUserTasks(currentPage, rowsPerPage)
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status');
    }
  };
  

  const getTaskBgColor = (index) => {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100'];
    return colors[index % 3];
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4">Manage Tasks</h2>
              <div className="mt-6 mb-6">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    className="p-2 border rounded w-1/2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <select
                    className="p-2 border rounded"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="asc">Sort by Title (A-Z)</option>
                    <option value="desc">Sort by Title (Z-A)</option>
                  </select>
                </div>
              </div>
              {/* Edit Task Form */}
              {editingTask && (
                <div className="mt-4 mb-4">
                  <h3 className="text-xl">Edit Task</h3>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="p-2 border rounded mb-2 w-full"
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="p-2 border rounded mb-2 w-full"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="p-2 bg-green-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="p-2 bg-red-500 text-white rounded ml-2"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isShowTask ? (
                  <div>Loading tasks...</div>
                ) : filteredTasks.length > 0 ? (
                  filteredTasks.map((task, index) => (
                    <div key={task._id} className={`p-4 border rounded ${getTaskBgColor(index)}`}>
                      <h4 className="font-bold">{task.title}</h4>
                      <p>{task.description}</p>

                      <div className="flex space-x-2 mt-2">
                              <button
                                onClick={() => handleStatusChange(task._id, task.status === 'Completed' ? 'In-Progress' : 'Completed')}
                                className={`p-2 text-white rounded ${task.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}`}
                              >
                                {task.status}
                              </button>

                              <button
                                onClick={() => handleEdit(task)}
                                className="p-2 bg-yellow-500 text-white rounded"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(task._id)}
                                className="p-2 bg-red-500 text-white rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>No tasks available.</div>
                      )}
                    </div>


              <div className="flex justify-between mt-4 items-center">
                <div>
                  <label htmlFor="rowsPerPage" className="mr-2">
                    Rows per page:
                  </label>
                  <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="p-2 border rounded"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="p-2 bg-gray-500 text-white rounded"
                      disabled={currentPage <= 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="p-2 bg-gray-500 text-white rounded"
                      disabled={currentPage >= totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageTasks;
