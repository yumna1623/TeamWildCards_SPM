import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Globe,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const UserProfile = () => {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    contact: "",
    availability: "Available now",
  });

  const [skills, setSkills] = useState([
    { id: 1, name: "UX/UI Design", color: "bg-green-100 text-green-800" },
    { id: 2, name: "Prototyping", color: "bg-blue-100 text-blue-800" },
    { id: 3, name: "Figma", color: "bg-purple-100 text-purple-800" },
    { id: 4, name: "HTML/CSS", color: "bg-red-100 text-red-800" },
    { id: 5, name: "Communication", color: "bg-yellow-100 text-yellow-800" },
  ]);

  const [newSkill, setNewSkill] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date()); // current month/year

  // Load user info
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        title: user.title || "",
        contact: user.contact || "",
        availability: user.availability || "Available now",
      });
    }
  }, [user]);
const getDayColor = (date) => {
  const today = new Date();

  // Check if this date matches any task deadline
  const hasTask = tasks.some(
    (t) =>
      t.deadline &&
      new Date(t.deadline).toDateString() === date.toDateString()
  );

  if (hasTask) return "bg-red-500 text-white"; // 🔴 task due that day

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
    return "bg-green-500 text-white"; // 🟢 current day

  return "bg-gray-100 text-gray-800"; // ⚪ default
};


  // Get all dates in the current month
  const getDaysInMonth = (month) => {
    const year = month.getFullYear();
    const m = month.getMonth();
    const date = new Date(year, m, 1);
    const days = [];
    while (date.getMonth() === m) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;

  }; // Navigate months
  
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

 
  // Fetch tasks assigned to logged-in user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setTasks([]);
      }
    };

    if (user && token) fetchTasks();
  }, [user, token]);

  const toggleDropdown = (id) =>
    setOpenDropdown(openDropdown === id ? null : id);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
    } catch (err) {
      console.error("Error updating task status:", err);
    }
    setOpenDropdown(null);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!user?._id) return console.error("User ID not found!");

    try {
      const res = await axios.put(
        `/api/users/profile`, // ✅ correct route
        formData, // only detailed info
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData(res.data); // update state with saved data
      setIsEditing(false);
    } catch (err) {
      console.error(
        "❌ Error updating profile:",
        err.response?.data || err.message
      );
    }
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills((prev) => [
      ...prev,
      { id: Date.now(), name: newSkill, color: "bg-gray-100 text-gray-800" },
    ]);
    setNewSkill("");
  };

  const removeSkill = (id) => setSkills(skills.filter((s) => s.id !== id));

  // Helpers for tasks
  const getStatusTextStyle = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getAdminStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      case "Pending":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };

  const getProgressColor = (status) => {
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

  const getProgressWidth = (status) => {
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

  const taskDueDates = new Set(
    tasks.map((t) => new Date(t.deadline).getDate())
  );

 

  return (
    
    <div className="min-h-screen bg-blue-100 p-6 md:p-10 font-sans">
      
      <div className="flex items-center mb-8">
        <ArrowLeft className="text-gray-600 w-6 h-6 mr-4 cursor-pointer" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          My Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Info */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
                {user?.name
                  ? `${user.name.charAt(0)}${user.name
                      .split(" ")[1]
                      ?.charAt(0)}`
                  : "U"}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.title}</p>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="space-y-4 text-gray-600">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                  />
                  <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                  />
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                  />
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-blue-500" />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-400">Full Name</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-blue-500" />
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-xs text-gray-400">Email</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-blue-500" />
                    <div>
                      <p className="font-medium">{user.contact}</p>
                      <p className="text-xs text-gray-400">Contact</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase size={16} className="text-blue-500" />
                    <div>
                      <p className="font-medium">{user.title}</p>
                      <p className="text-xs text-gray-400">Designation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tasks */}
          <div className="bg-white p-6 rounded-2xl shadow-sm col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4">My Tasks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.length === 0 && (
                <p className="text-gray-500">No tasks assigned yet.</p>
              )}
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-xs font-semibold rounded-full px-2 py-1 ${getAdminStatusStyle(
                        task.decision || "Pending"
                      )}`}
                    >
                      {task.decision || "Pending"}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800">{task.title}</h4>
                  <div className="mt-2 text-gray-600 text-sm">
                    {task.description || "No description provided."}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusTextStyle(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(task._id)}
                        className="flex items-center text-indigo-600 hover:underline text-xs font-medium"
                      >
                        Update Status{" "}
                        {openDropdown === task._id ? (
                          <ChevronUp className="w-3 h-3 ml-1" />
                        ) : (
                          <ChevronDown className="w-3 h-3 ml-1" />
                        )}
                      </button>
                      {openDropdown === task._id && (
                        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            {["In Progress", "Done", "Pending"].map(
                              (status) => (
                                <button
                                  key={status}
                                  onClick={() =>
                                    handleUpdateStatus(task._id, status)
                                  }
                                  className="block px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 w-full text-left"
                                >
                                  {status}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-in-out ${getProgressColor(
                        task.status
                      )} ${getProgressWidth(task.status)}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          {/* <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Calendar</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {["M", "T1", "W", "T2", "F", "S1", "S2"].map((day, i) => (
                <div key={i} className="text-xs text-gray-400">
                  {day.replace(/[0-9]/g, "")}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${getDayColor(
                    day
                  )}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div> */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
  <div className="flex justify-between items-center mb-2">
    <button onClick={handlePrevMonth}>&larr;</button>
    <h3 className="text-lg font-bold text-gray-800">
      {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
    </h3>
    <button onClick={handleNextMonth}>&rarr;</button>
  </div>

  <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
    {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
      <div key={day} className="text-xs text-gray-400">{day}</div>
    ))}
  </div>

  <div className="grid grid-cols-7 gap-1 text-center text-sm">
    {getDaysInMonth(currentMonth).map((date) => (
      <div
        key={date.toISOString()}
        className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${getDayColor(
          date
        )}`}
      >
        {date.getDate()}
      </div>
    ))}
  </div>
</div>


          {/* Skills */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex justify-between items-center">
              Skills
              <div className="flex gap-1">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill"
                  className="border px-2 py-1 rounded text-sm"
                />
                <button
                  onClick={addSkill}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Add
                </button>
              </div>
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full ${skill.color}`}
                >
                  <span>{skill.name}</span>
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeSkill(skill.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
