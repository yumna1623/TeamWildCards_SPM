import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  ListTodo,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Building2,
} from "lucide-react";

const ViewTasks = () => {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDept, setSelectedDept] = useState("All");

  // 🧠 Fetch all team tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const teamId = user?.team?._id || user?.team;

        const res = await fetch(
          `http://localhost:5000/api/tasks/team/${teamId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) fetchTasks();
  }, [user, token]);

  // ✅ Admin approves/rejects a task
  const handleDecision = async (taskId, decision) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${taskId}/decision`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ decision }),
        }
      );

      if (!res.ok) throw new Error("Failed to update decision");
      const data = await res.json();

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, decision: data.task.decision } : t
        )
      );
    } catch (err) {
      console.error("Error updating decision:", err);
    }
  };

  // 🧩 Extract unique departments
  const departments = [
    "All",
    ...new Set(tasks.map((t) => t.department?.name).filter(Boolean)),
  ];

  // 🧩 Filtered task list
  const filteredTasks =
    selectedDept === "All"
      ? tasks
      : tasks.filter((t) => t.department?.name === selectedDept);

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <ListTodo className="w-7 h-7 text-indigo-600" />
          All Team Tasks
        </h2>

        {/* 🧩 Department Filter */}
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-gray-600" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-400"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found for this department.</p>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="p-5 bg-white rounded-xl shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />{" "}
                  {task.assignedTo?.name || "Unassigned"} (
                  {task.assignedTo?.email})
                </span>

                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />{" "}
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString()
                    : "No deadline"}
                </span>

                {/* 🏢 Department */}
                {task.department?.name && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {task.department.name}
                  </span>
                )}
              </div>

              {/* Status & Decision */}
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    task.status === "Done"
                      ? "bg-green-100 text-green-700"
                      : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {task.status}
                </span>

                {task.status === "Done" && (
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      task.decision === "Accepted"
                        ? "bg-green-200 text-green-800"
                        : task.decision === "Rejected"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {task.decision || "Pending"}
                  </span>
                )}
              </div>

              {/* Admin actions */}
              {user?.role === "admin" &&
                task.status === "Done" &&
                (task.decision === "Pending" || !task.decision) && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleDecision(task._id, "Accepted")}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg flex items-center gap-1 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4" /> Accept
                    </button>
                    <button
                      onClick={() => handleDecision(task._id, "Rejected")}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg flex items-center gap-1 hover:bg-red-700"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTasks;
