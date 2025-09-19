// src/components/admin/Tasks.jsx
import { useState } from "react";
import {
  FileText,
  User,
  Mail,
  Calendar,
  ListTodo,
  Layers,
  Feather,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

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
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Created:", task);

    // show success dialog
    setSuccess(true);

    // reset form
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
    <div className="w-full flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center gap-2">
          <ListTodo className="w-6 h-6 text-indigo-600" />
          Assign a New Task
        </h2>

        {/* ✅ Success Banner (inline, not fullscreen) */}
        {success && (
          <div className="mb-6 p-4 rounded-lg border border-green-300 bg-green-50 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <span className="text-green-700 font-medium">
              Task Assigned Successfully!
            </span>
            <button
              onClick={() => setSuccess(false)}
              className="ml-auto text-sm text-green-700 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div>
            <label
              htmlFor="taskTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Title
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="taskTitle"
                placeholder="Enter task title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* Task Description */}
          <div>
            <label
              htmlFor="taskDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Description
            </label>
            <textarea
              id="taskDescription"
              placeholder="Provide task details"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
              rows="3"
            />
          </div>

          {/* Member Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Member Name */}
            <div>
              <label
                htmlFor="memberName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Member Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="memberName"
                  placeholder="Enter name"
                  value={task.memberName}
                  onChange={(e) =>
                    setTask({ ...task, memberName: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Member Email */}
            <div>
              <label
                htmlFor="memberEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Member Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  id="memberEmail"
                  placeholder="Enter email"
                  value={task.memberEmail}
                  onChange={(e) =>
                    setTask({ ...task, memberEmail: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Deadline / Priority / Department */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Deadline */}
            <div>
              <label
                htmlFor="deadline"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Deadline
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  id="deadline"
                  value={task.deadline}
                  onChange={(e) =>
                    setTask({ ...task, deadline: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Priority
              </label>
              <div className="relative">
                <Feather className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  id="priority"
                  value={task.priority}
                  onChange={(e) =>
                    setTask({ ...task, priority: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Department */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="department"
                  placeholder="e.g., Marketing"
                  value={task.department}
                  onChange={(e) =>
                    setTask({ ...task, department: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Assign Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tasks;
