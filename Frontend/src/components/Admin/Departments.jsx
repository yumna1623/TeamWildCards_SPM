// src/components/admin/Departments.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
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
  const { user, token } = useAuth();

  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Tailwind classes directly
  const cardColors = [
    "bg-indigo-600",
    "bg-purple-600",
    "bg-blue-600",
    "bg-emerald-600",
    "bg-rose-600",
    "bg-amber-600",
    "bg-teal-600",
  ];

  const handleAddDept = async () => {
    const teamId = user?.team?._id || user?.team;
    if (!newDeptName.trim() || !teamId) {
      alert("User team not available. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newDeptName, team: teamId }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to create department");
        return;
      }

      const data = await res.json();
      setDepartments((prev) => [...prev, data]);
      setNewDeptName("");
    } catch (error) {
      console.error("Error adding department:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Departments
 useEffect(() => {
  const fetchDepts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/departments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  if (user && token) {
    fetchDepts();
  }
}, [user, token]);


  const handleTaskAction = (taskId, action) => {
    console.log(`Task ${taskId} → ${action}`);
    // later: API call to update task status
  };

  return (
    <div
      id="Departments"
      className="p-6 bg-gray-50 rounded-xl shadow-lg min-h-screen"
    >
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
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Manage Departments
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Add, view, and manage your organizational departments.
          </p>

          {/* Add Department Input */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <input
              type="text"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              placeholder="Enter a new department name"
              className="flex-grow px-5 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleAddDept()}
            />
            <button
              onClick={handleAddDept}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-800 disabled:opacity-50"
            >
              <PlusCircle className="w-5 h-5" />
              {loading ? "Adding..." : "Add Department"}
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
                    key={dept._id || i}
                    onClick={() => setSelectedDept(dept)}
                    className={`relative p-6 flex flex-col justify-between 
                      ${cardColor} text-white rounded-2xl shadow-md 
                      hover:shadow-xl hover:-translate-y-1 cursor-pointer`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-white/20">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{dept.name}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm font-medium opacity-90">
                      <div>📝 {dept.tasks || 0} Tasks</div>
                      <div>👥 {dept.members || 0} Members</div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {dept.nextDeadline || "No deadline"}
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
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedDept.name}
              </h2>
              <p className="text-gray-500">Overview of members & tasks</p>
            </div>
            <span className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow">
              {selectedDept.tasks || 0} Tasks
            </span>
          </div>

          {/* Members Section (to be filled with API data later) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Team Members
            </h3>
            <p className="text-gray-500">⚠️ Hook up API for members here</p>
          </div>

          {/* Tasks Section (to be filled with API data later) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Tasks</h3>
            <p className="text-gray-500">⚠️ Hook up API for tasks here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
