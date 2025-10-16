import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Layers, Clock, Users } from "lucide-react";

const UserDepartments = () => {
  const { user, token } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);

  const departmentColors = [
    "#687FE5",
    "#E1AFD1",
    "#6155A6",
    "#D291BC",
    "#FFF9BF",
    "#BCE29E",
    "#9ADCFF",
    "#60A9A6",
  ];

  const getRandomColor = () =>
    departmentColors[Math.floor(Math.random() * departmentColors.length)];

  const statusColors = {
    Done: "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Pending: "bg-gray-200 text-gray-600",
  };

  // ✅ Fetch team departments
  useEffect(() => {
    const fetchDepts = async () => {
      try {
        if (!user?.team) return;
        const res = await fetch(
          `http://localhost:5000/api/departments?teamId=${user.team}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch departments");
        const data = await res.json();
        setDepartments(data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };
    fetchDepts();
  }, [user, token]);

  return (
    <div className="p-6 bg-[#C4D9FF] min-h-screen relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(to_right,#E0E7FF_1px,transparent_1px),linear-gradient(to_bottom,#E0E7FF_1px,transparent_1px)] before:bg-[size:20px_20px]">
      {selectedDept && (
        <button
          onClick={() => setSelectedDept(null)}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium z-10 relative"
        >
          ← Back to Departments
        </button>
      )}

      {/* --- Department Cards --- */}
      {!selectedDept ? (
        <div className="z-10 relative">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <Layers className="w-8 h-8 text-indigo-600" />
            Your Departments
          </h2>

          {departments.length === 0 ? (
            <p className="text-gray-600">No departments found in your team.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept) => (
                <div
                  key={dept._id}
                  onClick={() => setSelectedDept(dept)}
                  className="p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {dept.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-800">
                    <div>📝 {dept.tasks?.length || 0} Tasks</div>
                    <div>👥 {dept.members?.length || 0} Members</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* --- Selected Department View --- */
        <div className="flex flex-col gap-8 z-10 relative">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedDept.name}
            </h2>
            <span className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow">
              {selectedDept.tasks?.length || 0} Tasks •{" "}
              {selectedDept.members?.length || 0} Members
            </span>
          </div>

          {/* --- Members --- */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Department Members
            </h3>
            {selectedDept.members?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedDept.members.map((m) => (
                  <div
                    key={m._id}
                    className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
                  >
                    <h4 className="font-semibold text-gray-800">{m.name}</h4>
                    <p className="text-sm text-gray-500 mb-1">{m.role}</p>
                    <p className="text-xs text-gray-400">{m.email}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No members in this department.</p>
            )}
          </div>

          {/* --- Tasks --- */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Department Tasks
            </h3>
            {selectedDept.tasks?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-white shadow rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700 text-sm">
                    <tr>
                      <th className="px-6 py-3">Task</th>
                      <th className="px-6 py-3">Assigned To</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {selectedDept.tasks.map((task) => (
                      <tr key={task._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{task.title}</td>
                        <td className="px-6 py-4">
                          {task.assignedTo
                            ? `${task.assignedTo.name} (${task.assignedTo.email})`
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              statusColors[task.status] || "bg-gray-200"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          {task.deadline || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No tasks in this department.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDepartments;
