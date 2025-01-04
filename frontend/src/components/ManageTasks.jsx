import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Auth/Footer';
import { useAuthStore } from '../store/authUser';

const ManageTasks = () => {
  const {
    getAllTasks,
    getUserTasks,
    tasks,
    isShowTask,
    totalTasks,
    userRole,
  } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const totalPages = Math.ceil(totalTasks / rowsPerPage);
  console.log({ totalTasks, rowsPerPage, totalPages });

  useEffect(() => {
    if (userRole === 'admin') {
      getAllTasks(currentPage, rowsPerPage);
    } else {
      getUserTasks(currentPage, rowsPerPage);
    }
  }, [currentPage, rowsPerPage, userRole, getAllTasks, getUserTasks])

  const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
  }
};

const handleRowsPerPageChange = (e) => {
  setRowsPerPage(Number(e.target.value));
  setCurrentPage(1); // Reset to the first page when rows per page changes
}


  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    });

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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isShowTask ? (
                  <div>Loading tasks...</div>
                ) : filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div key={task._id} className="p-4 border rounded">
                      <h4 className="font-bold">{task.title}</h4>
                      <p>{task.description}</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="p-2 bg-green-500 text-white rounded">
                          {task.status}
                        </button>
                        <button className="p-2 bg-yellow-500 text-white rounded">
                          Edit
                        </button>
                        <button className="p-2 bg-red-500 text-white rounded">
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
