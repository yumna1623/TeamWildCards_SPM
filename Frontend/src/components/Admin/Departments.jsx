// src/components/admin/Departments.jsx
import { useState } from "react";
import {
  Building2,
  PlusCircle,
  MoreVertical,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [openMenu, setOpenMenu] = useState(null); // Track which dropdown is open
  const [tasks, setTasks] = useState([
    { id: 1, title: "Landing Page UI", status: "In Progress", deadline: "2025-09-20" },
    { id: 2, title: "API Integration", status: "Done", deadline: "2025-09-15" },
    { id: 3, title: "Bug Fixes", status: "Delayed", deadline: "2025-09-10" },
  ]);

  const members = [
    { id: 1, name: "Alice Johnson", role: "Developer", progress: 80 },
    { id: 2, name: "Bob Smith", role: "Designer", progress: 50 },
    { id: 3, name: "Charlie Lee", role: "Tester", progress: 30 },
  ];

  const statusColors = {
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Done": "bg-green-100 text-green-700",
    "Delayed": "bg-red-100 text-red-700",
    "Accepted": "bg-green-200 text-green-800",
    "Rejected": "bg-red-200 text-red-800",
  };

  const cardColors = ["indigo", "blue", "purple", "pink", "teal", "orange"];

  const handleAddDept = () => {
    if (newDeptName.trim() === "") return;
    setDepartments([
      ...departments,
      {
        name: newDeptName.trim(),
        tasks: Math.floor(Math.random() * 20) + 1,
        members: Math.floor(Math.random() * 10) + 1,
        nextDeadline: "2025-10-01",
      },
    ]);
    setNewDeptName("");
  };

  const handleTaskAction = (taskId, action) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: action } : t
      )
    );
    setOpenMenu(null);
  };

  return (
    
    <div
    id="Departments"
    className="p-6 bg-gray-50 rounded-xl shadow-lg min-h-screen">
      {/* Back Button */}
      {selectedDept && (
        <button
          onClick={() => setSelectedDept(null)}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
        >
          ← Back to Departments
        </button>
      )}

      {/* Departments List View */}
      {!selectedDept ? (
        <>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 text-center sm:text-left">
            Manage Departments
          </h2>
          <p className="text-lg text-gray-500 mb-8 text-center sm:text-left">
            Add, view, and manage your organizational departments and their key metrics.
          </p>

          {/* Add Department Input */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <input
              type="text"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              placeholder="Enter a new department name"
              className="flex-grow px-5 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 outline-none transition-colors duration-200"
              onKeyDown={(e) => e.key === "Enter" && handleAddDept()}
            />
            <button
              onClick={handleAddDept}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-800 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <PlusCircle className="w-5 h-5" />
              Add Department
            </button>
          </div>

          {/* Departments Grid */}
          {departments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <Building2 className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-xl font-medium text-gray-500">
                No departments added yet.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Start by adding your first department above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, i) => {
                const cardColor = cardColors[i % cardColors.length];
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDept(dept)}
                    className={`relative p-6 flex flex-col justify-between 
                      bg-${cardColor}-600 text-white rounded-2xl shadow-md border border-gray-100 
                      transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-white/20 shadow-sm`}>
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{dept.name}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm font-medium opacity-90">
                      <div>📝 {dept.tasks} Tasks</div>
                      <div>👥 {dept.members} Members</div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {dept.nextDeadline}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        /* Department Detail View */
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedDept.name}</h2>
              <p className="text-gray-500">Overview of members & tasks</p>
            </div>
            <span className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow">
              {selectedDept.tasks} Tasks
            </span>
          </div>

          {/* Members Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Team Members</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
                >
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

          {/* Tasks Section with Dropdown */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Tasks</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white shadow rounded-xl overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                  <tr>
                    <th className="px-6 py-3">Task</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Deadline</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b hover:bg-gray-50 relative">
                      <td className="px-6 py-4 font-medium">{task.title}</td>
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
                      <td className="px-6 py-4 flex items-center gap-3 relative">
                        {/* Delete */}
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>

                        {/* 3 Dots Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === task.id ? null : task.id)
                            }
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {openMenu === task.id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                              <button
                                onClick={() => handleTaskAction(task.id, "Accepted")}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50 w-full text-left"
                              >
                                <CheckCircle className="w-4 h-4" /> Accept
                              </button>
                              <button
                                onClick={() => handleTaskAction(task.id, "Rejected")}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                              >
                                <XCircle className="w-4 h-4" /> Reject
                              </button>
                            </div>
                          )}
                        </div>
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

export default Departments;
