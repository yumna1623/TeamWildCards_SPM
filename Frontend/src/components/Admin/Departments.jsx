import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Building2,
  PlusCircle,
  Clock,
  ListTodo,
  User,
  ArrowLeft,
} from "lucide-react";

const Departments = () => {
  const { user, token } = useAuth();

  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deptTasks, setDeptTasks] = useState([]); // ✅ For showing department tasks
  const [deptMembers, setDeptMembers] = useState([]); // ✅ For showing members in this department

  const cardColors = [
    "bg-pink-600",
    "bg-purple-600",
    "bg-blue-600",
    "bg-emerald-600",
    "bg-rose-600",
    "bg-amber-600",
    "bg-teal-600",
  ];

  // ✅ Add new department
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

  // ✅ Fetch all departments for the team
  useEffect(() => {
    const fetchDepts = async () => {
      try {
        if (!user?.team) return;
        const res = await fetch(
          `http://localhost:5000/api/departments?teamId=${
            user.team._id || user.team
          }`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
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

  // ✅ When admin clicks department, fetch related tasks and members
  const handleSelectDept = async (dept) => {
    setSelectedDept(dept);
    setLoading(true);

    try {
      // Fetch tasks of that department
      const res = await fetch(
        `http://localhost:5000/api/tasks/team/${user?.team?._id || user?.team}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const allTasks = await res.json();

      // Filter tasks belonging to this department
      const deptSpecificTasks = allTasks.filter(
        (task) => task.department?._id === dept._id
      );
      setDeptTasks(deptSpecificTasks);

      // Extract unique members assigned to these tasks
      const uniqueMembers = Array.from(
        new Map(
          deptSpecificTasks
            .filter((t) => t.assignedTo)
            .map((t) => [t.assignedTo._id, t.assignedTo])
        ).values()
      );

      setDeptMembers(uniqueMembers);
    } catch (error) {
      console.error("Error fetching department data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg min-h-screen">
      {/* 🔙 Back Button */}
      {selectedDept && (
        <button
          onClick={() => {
            setSelectedDept(null);
            setDeptTasks([]);
            setDeptMembers([]);
          }}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Departments
        </button>
      )}

      {/* 🏢 All Departments */}
      {!selectedDept ? (
        <>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Manage Departments
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Add, view, and manage your organizational departments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <input
              type="text"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
              placeholder="Enter a new department name"
              className="flex-grow px-5 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 outline-none"
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

          {departments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <Building2 className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-xl font-medium text-gray-500">
                No departments added yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, i) => {
                const cardColor = cardColors[i % cardColors.length];
                return (
                  <div
                    key={dept._id || i}
                    onClick={() => handleSelectDept(dept)}
                    className={`relative p-6 ${cardColor} text-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer transition`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-white/20">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold">{dept.name}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm font-medium opacity-90">
                      <div>📝 {dept.tasks?.length || 0} Tasks</div>
                      <div>👥 {dept.members?.length || 0} Members</div>
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
        // 🧩 Department Detail View
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-7 h-7 text-indigo-600" />
            {selectedDept.name} Department
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading department details...</p>
          ) : (
            <>
              {/* Members Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Members Assigned
                </h3>
                {deptMembers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {deptMembers.map((member) => (
                      <div
                        key={member._id}
                        className="p-4 bg-white rounded-xl shadow border border-gray-200"
                      >
                        <p className="font-semibold text-gray-800">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No members assigned yet.</p>
                )}
              </div>

              {/* Tasks Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-indigo-600" />
                  Tasks in this Department
                </h3>
                {deptTasks.length > 0 ? (
                  <div className="space-y-4">
                    {deptTasks.map((task) => (
                      <div
                        key={task._id}
                        className="p-4 bg-white rounded-xl shadow border border-gray-200"
                      >
                        <h4 className="font-semibold text-gray-900">
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {task.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Assigned to: {task.assignedTo?.name || "Unassigned"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Status: {task.status} | Decision:{" "}
                          {task.decision || "Pending"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No tasks found.</p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Departments;
