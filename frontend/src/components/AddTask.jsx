import React from 'react'

const AddTask = () => {
  return (
    <div>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg m-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Task</h2>
      <form >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 h-48"
            placeholder="Enter task description"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition "
        >
          Create Task
        </button>
        </form>
        </div>
    </div>
  )
}

export default AddTask