// src/components/admin/Departments.jsx
import { useState } from "react";
import { Building2, PlusCircle } from "lucide-react";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");

  const handleAddDept = () => {
    if (newDept.trim() === "") return;

    // Each department has metadata
    setDepartments([
      ...departments,
      {
        name: newDept,
        tasks: 0,
        members: 0,
        nextDeadline: null,
      },
    ]);
    setNewDept("");
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6">
        Departments
      </h2>

      {/* Add Department Input */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          placeholder="Enter department name"
          className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        <button
          onClick={handleAddDept}
          className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Add
        </button>
      </div>

      {/* Departments Grid */}
      {departments.length === 0 ? (
        <p className="text-gray-500">No departments added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {departments.map((dept, i) => (
            <div
              key={i}
              className="relative aspect-square p-6 flex flex-col justify-between 
              bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 
              rounded-2xl shadow-lg border hover:scale-105 transform transition cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-indigo-700" />
                <h3 className="text-xl font-bold text-gray-800">{dept.name}</h3>
              </div>

              {/* Info Section */}
              <div className="mt-4 space-y-2">
                <p className="text-gray-700 font-medium">📝 {dept.tasks} Tasks</p>
                <p className="text-gray-600 text-sm">👥 Members: {dept.members}</p>
                <p className="text-gray-600 text-sm">
                  ⏳ Upcoming: {dept.nextDeadline || "None"}
                </p>
              </div>

              {/* Task Counter Badge */}
              <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 text-sm font-semibold rounded-full shadow">
                {dept.tasks}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Departments;
