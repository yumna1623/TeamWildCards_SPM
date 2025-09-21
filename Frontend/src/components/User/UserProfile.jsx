import { useState } from "react";
import { ArrowLeft, Mail, Phone, Briefcase, Globe, CalendarDays, ChevronDown, ChevronUp, User } from "lucide-react";

const UserProfile = () => {
  const [user] = useState({
    name: "Robert Smith",
    title: "Product Designer",
    email: "robertsmith64@gmail.com",
    contact: "(552) 555-5674",
    availability: "Available now"
  });

  const [tasks, setTasks] = useState([
    { id: 1, title: "Fix Navbar Bug", status: "In Progress", adminStatus: "Accepted", date: "March 05, 2024" },
    { id: 2, title: "Update Landing Page", status: "Done", adminStatus: "Accepted", date: "March 08, 2024" },
    { id: 3, title: "Prepare Presentation", status: "Pending", adminStatus: "Rejected", date: "March 12, 2024" },
    { id: 4, title: "Deploy Backend Service", status: "Done", adminStatus: "Pending", date: "March 15, 2024" },
  ]);

  const skills = [
    { id: 1, name: "UX/UI Design", color: "bg-green-100 text-green-800" },
    { id: 2, name: "Prototyping", color: "bg-blue-100 text-blue-800" },
    { id: 3, name: "Figma", color: "bg-purple-100 text-purple-800" },
    { id: 4, name: "HTML/CSS", color: "bg-red-100 text-red-800" },
    { id: 5, name: "Communication", color: "bg-yellow-100 text-yellow-800" },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

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

  const handleUpdateStatus = (id, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
    setOpenDropdown(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
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

  // Dynamically create a Set of due dates for quick lookup
  const taskDueDates = new Set(
    tasks.map(task => new Date(task.date).getDate())
  );

  const getDayColor = (day) => {
    const today = new Date().getDate();

    // Check if the day is a task due date
    if (taskDueDates.has(day)) return `bg-red-500 text-white`;

    // Highlight the current day
    if (day === today) return "bg-indigo-600 text-white";

    return "bg-gray-100 text-gray-800";
  }

  return (
    <div className="min-h-screen bg-blue-100 p-6 md:p-10 font-sans">
      <div className="flex items-center mb-8">
        <ArrowLeft className="text-gray-600 w-6 h-6 mr-4 cursor-pointer" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Info Card */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
                {user.name.charAt(0)}{user.name.split(' ')[1].charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.title}</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>Time Slots</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span>June, 2025</span>
                <span>Meetings</span>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Detailed Information</h3>
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
                  <p className="text-xs text-gray-400">Email Address</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-blue-500" />
                <div>
                  <p className="font-medium">{user.contact}</p>
                  <p className="text-xs text-gray-400">Contact Number</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase size={16} className="text-blue-500" />
                <div>
                  <p className="font-medium">{user.title}</p>
                  <p className="text-xs text-gray-400">Designation</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-blue-500" />
                <div>
                  <p className="font-medium">{user.availability}</p>
                  <p className="text-xs text-gray-400">Availability</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* My Tasks */}
          <div className="bg-white p-6 rounded-2xl shadow-sm col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">My Tasks</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tasks.map(task => (
                <div key={task.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-semibold rounded-full px-2 py-1 ${getAdminStatusStyle(task.adminStatus)}`}>
                      {task.adminStatus}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{task.date}</span>
                  </div>
                  <h4 className="font-bold text-gray-800">{task.title}</h4>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusTextStyle(task.status)}`}>
                      {task.status}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(task.id)}
                        className="flex items-center text-indigo-600 hover:underline text-xs font-medium"
                      >
                        Update Status
                        {openDropdown === task.id ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                      </button>
                      {openDropdown === task.id && (
                        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            <button onClick={() => handleUpdateStatus(task.id, "In Progress")} className="block px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 w-full text-left">In Progress</button>
                            <button onClick={() => handleUpdateStatus(task.id, "Done")} className="block px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 w-full text-left">Done</button>
                            <button onClick={() => handleUpdateStatus(task.id, "Pending")} className="block px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 w-full text-left">Pending</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ease-in-out ${getProgressColor(task.status)} ${getProgressWidth(task.status)}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Calendar</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
                <div key={day} className="text-xs text-gray-400">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <div
                  key={day}
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${getDayColor(day)}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className={`px-3 py-1 text-sm font-semibold rounded-full ${skill.color}`}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
