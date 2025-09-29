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

const Tasks = () => {
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

  // ✅ Fetch only team departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const teamId = user?.team?._id || user?.team;
        if (!teamId) return;

        const res = await axios.get(
          `http://localhost:5000/api/departments?teamId=${teamId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
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
        "http://localhost:5000/api/tasks",
        task,
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
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter task title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Description
                </label>
                <textarea
                  placeholder="Provide task details"
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows="3"
                />
              </div>

              {/* Member Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter member name"
                      value={task.memberName}
                      onChange={(e) =>
                        setTask({ ...task, memberName: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter member email"
                      value={task.memberEmail}
                      onChange={(e) =>
                        setTask({ ...task, memberEmail: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Department Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={task.department}
                    onChange={(e) =>
                      setTask({ ...task, department: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none"
                    required
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Deadline & Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={task.deadline}
                      onChange={(e) =>
                        setTask({ ...task, deadline: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <div className="relative">
                    <Feather className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={task.priority}
                      onChange={(e) =>
                        setTask({ ...task, priority: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm appearance-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-800 transition"
              >
                Create Task
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-200"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-green-500 transition-all duration-300"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>
              {progress === 100 && (
                <CheckCircle2 className="absolute inset-0 m-auto w-16 h-16 text-green-500" />
              )}
            </div>
            <p className="mt-6 text-xl font-semibold text-gray-800">
              Task Created Successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
