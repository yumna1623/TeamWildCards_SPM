import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ListTodo, User, Calendar } from "lucide-react";

const ViewTasks = () => {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const teamId = user?.team?._id || user?.team;

        const res = await fetch(
          `http://localhost:5000/api/tasks/team/${teamId}`, // 👈 endpoint for team tasks
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

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ListTodo className="w-7 h-7 text-indigo-600" />
        All Team Tasks
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-5 bg-white rounded-xl shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />{" "}
                  {task.assignedTo?.name || "Unassigned"} (
                  {task.assignedTo?.email})
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {task.deadline || "No deadline"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTasks;
