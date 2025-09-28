import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  const getStatusLineColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-[#006A67]";
      case "In Progress":
        return "bg-[#F4991A]";
      case "Pending":
        return "bg-[#F75270]";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case "Done":
        return "w-full";
      case "In Progress":
        return "w-1/2";
      case "Pending":
        return "w-0";
      default:
        return "w-0";
    }
  };

  const getStatusTextStyle = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-200 text-green-500";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-red-200 text-red-800";
      default:
        return "bg-red-100 text-red-600";
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `/api/tasks/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? { ...task, status: newStatus } : task))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
    setOpenDropdown(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (sortKey === "deadline") {
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);
      if (aDate < bDate) return sortDirection === "asc" ? -1 : 1;
      if (aDate > bDate) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-[#C4D9FF] p-6 md:p-8 rounded-xl min-h-screen shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(to_right,#E0E7FF_1px,transparent_1px),linear-gradient(to_bottom,#E0E7FF_1px,transparent_1px)] before:bg-[size:20px_20px]">
      <div className="z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            My Tasks
          </h2>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-sm text-gray-700 font-medium">Sort by:</span>
            <button
              onClick={() => handleSort("title")}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 shadow-sm ${
                sortKey === "title" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Title
            </button>
            <button
              onClick={() => handleSort("status")}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 shadow-sm ${
                sortKey === "status" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Status
            </button>
            <button
              onClick={() => handleSort("deadline")}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-200 shadow-sm ${
                sortKey === "deadline" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Due Date
            </button>
          </div>
        </div>

        <div className="w-full h-[2px] bg-gray-200 rounded-full mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTasks.map((task) => (
            <div
              key={task._id}
              className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="text-lg font-bold text-gray-800">{task.title}</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusTextStyle(task.status)}`}>
                  {task.status}
                </span>
              </div>

              <div className="text-sm text-gray-500 mt-1">
                {task.department?.name && <span>Department: {task.department.name}</span>}
              </div>

              <div className="flex items-center justify-between my-4 text-sm text-gray-500">
                <span>📅 Due: {task.deadline?.split("T")[0]}</span>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(task._id)}
                    className="flex items-center text-indigo-600 hover:underline text-xs font-medium"
                  >
                    Update Status
                    {openDropdown === task._id ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                  </button>
                  {openDropdown === task._id && (
                    <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        {["In Progress", "Done", "Pending"].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleUpdateStatus(task._id, status)}
                            className="block px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 w-full text-left"
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-3 bg-gray-200 rounded-full mt-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-in-out ${getStatusLineColor(task.status)} ${getStatusProgress(task.status)}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTasks;
