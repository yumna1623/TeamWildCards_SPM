// src/components/admin/Tasks.jsx
import { useState } from "react";
import { FileText, User, Mail, Calendar, ListTodo, Layers, Feather, ChevronDown } from "lucide-react";

const Tasks = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    memberName: "",
    memberEmail: "",
    deadline: "",
    priority: "Medium",
    department: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Created:", task);
    alert("Task assigned successfully!");
    // Reset form
    setTask({
      title: "",
      description: "",
      memberName: "",
      memberEmail: "",
      deadline: "",
      priority: "Medium",
      department: "",
    });
  };

  return (
    <div className="p-8 bg-gray-100 rounded-2xl">
      <h2 className="text-4xl font-extrabold text-indigo-800 mb-8 flex items-center gap-3">
        <ListTodo className="w-8 h-8 text-indigo-600" />
        Assign a New Task
      </h2>

      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Task Title and Description */}
          <div>
            <label htmlFor="taskTitle" className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="taskTitle"
                placeholder="Enter a clear, concise task title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="taskDescription" className="block text-sm font-semibold text-gray-700 mb-2">
              Task Description
            </label>
            <textarea
              id="taskDescription"
              placeholder="Provide detailed instructions and context for the task"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              rows="4"
            />
          </div>

          <hr className="border-t border-gray-200" />

          {/* Member Info and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Member Name */}
            <div>
              <label htmlFor="memberName" className="block text-sm font-semibold text-gray-700 mb-2">
                Member Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="memberName"
                  placeholder="Enter member's full name"
                  value={task.memberName}
                  onChange={(e) => setTask({ ...task, memberName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Member Email */}
            <div>
              <label htmlFor="memberEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                Member Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="memberEmail"
                  placeholder="Enter member's email"
                  value={task.memberEmail}
                  onChange={(e) => setTask({ ...task, memberEmail: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Deadline, Priority, and Department */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-semibold text-gray-700 mb-2">
                Deadline
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  id="deadline"
                  value={task.deadline}
                  onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                Priority
              </label>
              <div className="relative">
                <Feather className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="priority"
                  value={task.priority}
                  onChange={(e) => setTask({ ...task, priority: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                Department
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="department"
                  placeholder="e.g., Marketing, Software"
                  value={task.department}
                  onChange={(e) => setTask({ ...task, department: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-8 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Assign Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tasks;