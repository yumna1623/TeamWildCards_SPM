import { useState } from "react";
import { Layers, Clock } from "lucide-react";

const UserDepartments = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const departmentColors = ["#687FE5", "#E1AFD1", "#6155A6", "#D291BC", "#FFF9BF", "#BCE29E", "#9ADCFF", "#60A9A6"];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * departmentColors.length);
    return departmentColors[randomIndex];
  };

  const [departments] = useState([
    {
      id: 1,
      name: "Engineering",
      tasks: [
        { id: 1, title: "Fix Login Bug", status: "In Progress", deadline: "2025-09-20", assignedTo: "Alice Johnson" },
        { id: 2, title: "API Integration", status: "Done", deadline: "2025-09-15", assignedTo: "Bob Smith" },
      ],
      members: [
        { id: 1, name: "Alice Johnson", role: "Developer", progress: 80 },
        { id: 2, name: "Bob Smith", role: "Designer", progress: 50 },
      ],
    },
    {
      id: 2,
      name: "Marketing",
      tasks: [
        { id: 3, title: "Ad Campaign", status: "Pending", deadline: "2025-09-18", assignedTo: "Charlie Lee" },
      ],
      members: [
        { id: 3, name: "Charlie Lee", role: "Marketer", progress: 60 },
      ],
    },
  ]);

  const statusColors = {
    "Done": "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Pending": "bg-gray-200 text-gray-600",
  };

  return (
    <div className="p-6 bg-[#C4D9FF] min-h-screen relative overflow-hidden before:absolute  before:absolute before:inset-0 before:bg-[linear-gradient(to_right,#E0E7FF_1px,transparent_1px),linear-gradient(to_bottom,#E0E7FF_1px,transparent_1px)] before:bg-[size:20px_20px]">
      {selectedDept && (
        <button
          onClick={() => setSelectedDept(null)}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium z-10 relative"
        >
          ← Back to Departments
        </button>
      )}

      {!selectedDept ? (
        <div className="z-10 relative">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <Layers className="w-8 h-8 text-indigo-600" />
            Your Departments
          </h2>
          <p className="text-gray-500 mb-8">
            Click on a department to view tasks and members.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => setSelectedDept(dept)}
                className="p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
                style={{ backgroundColor: getRandomColor() }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{dept.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-800">
                  <div>📝 {dept.tasks.length} Tasks</div>
                  <div>👥 {dept.members.length} Members</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 z-10 relative">
          {/* Department header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{selectedDept.name}</h2>
            <span className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow">
              {selectedDept.tasks.length} Tasks
            </span>
          </div>

          {/* Members */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Team Members</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedDept.members.map((m) => (
                <div key={m.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{m.name}</h4>
                      <p className="text-sm text-gray-500">{m.role}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${m.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{m.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Tasks</h3>
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
                    <tr key={task.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{task.title}</td>
                      <td className="px-6 py-4">{task.assignedTo}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        {task.deadline}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDepartments;
