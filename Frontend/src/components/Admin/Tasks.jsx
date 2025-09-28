import { useState, useEffect } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
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
  const [progress, setProgress] = useState(0);

  // fetch departments from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("/api/departments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/tasks",
        {
          title: task.title,
          description: task.description,
          memberName: task.memberName,
          memberEmail: task.memberEmail,
          deadline: task.deadline,
          priority: task.priority,
          departmentId: task.department,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setSuccess(true);
      setProgress(0);
      setTask({
        title: "",
        description: "",
        memberName: "",
        memberEmail: "",
        deadline: "",
        priority: "Medium",
        department: "",
      });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Animate circle progress
  useEffect(() => {
    if (success) {
      let value = 0;
      const interval = setInterval(() => {
        value += 2;
        if (value > 100) {
          clearInterval(interval);
          value = 100;
        }
        setProgress(value);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [success]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        {!success ? (
          <>
            <h2 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center gap-2">
              <ListTodo className="w-6 h-6 text-indigo-600" />
              Assign a New Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
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

              <div>
                <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Description
                </label>
                <textarea
                  id="taskDescription"
                  placeholder="Provide task details"
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="memberName" className="block text-sm font-medium text-gray-700 mb-1">
                    Member Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      id="memberName"
                      placeholder="Enter name"
                      value={task.memberName}
                      onChange={(e) => setTask({ ...task, memberName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="memberEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Member Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      id="memberEmail"
                      placeholder="Enter email"
                      value={task.memberEmail}
                      onChange={(e) => setTask({ ...task, memberEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      id="deadline"
                      value={task.deadline}
                      onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <div className="relative">
                    <Feather className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      id="priority"
                      value={task.priority}
                      onChange={(e) => setTask({ ...task, priority: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      id="department"
                      value={task.department}
                      onChange={(e) => setTask({ ...task, department: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none transition"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-6 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
              >
                Assign Task
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 mt-18">
            <div className="relative w-28 h-28 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  stroke="#22c55e"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-linear"
                />
              </svg>
              {progress === 100 && (
                <CheckCircle2 className="absolute inset-0 m-auto w-14 h-14 text-green-600" />
              )}
            </div>

            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Task Assigned Successfully!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              The task has been created and assigned.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
