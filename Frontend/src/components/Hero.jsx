import { Link } from "react-router-dom";
import { Users, Trello, PieChart } from "lucide-react"; // Imported Lucide icons for a more professional look

const Hero = () => {
  // Fake chart data
  const chartData = [
    { name: "Done", value: 24, color: "#34d399" }, // green
    { name: "In Progress", value: 25, color: "#3b82f6" }, // blue
    { name: "Sparing", value: 18, color: "#f59e0b" }, // orange
    { name: "In Review", value: 12, color: "#9ca3af" }, // gray
    { name: "To Do", value: 11, color: "#60a5fa" }, // light blue
  ];

  const totalTasks = chartData.reduce((sum, item) => sum + item.value, 0);
  const donePercentage = ((chartData[0].value / totalTasks) * 100).toFixed(0);

  const teamWorkload = [
    { name: "Amar Sundaram", percentage: 27, items: 25, color: "#f59e0b" },
    { name: "Eva Lien", percentage: 22, items: 20, color: "#3b82f6" },
    { name: "Alana Song", percentage: 15, items: 14, color: "#60a5fa" },
  ];

  return (
    <section className="h-screen flex items-center bg-gradient-to-br from-white to-indigo-200 py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          {/* Left Column: Text Content and Buttons */}
          <div className="text-center md:text-left">
            {/* <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wider mb-2">
              TeamSync
            </h2> */}
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Connect every team, <br className="hidden lg:inline" />
              task, and project together with <span className="text-indigo-700">TeamSync.</span>
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 text-lg text-gray-600 mb-8">
              A modern platform where leaders create teams, assign tasks, and track progress — while members collaborate seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/login"
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1"
              >
                Already In Team?
              </Link>
             
            </div>
          </div>

          {/* Right Column: Visual Dashboards */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex items-center justify-center gap-6">
              {/* Pie Chart */}
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  {/* Done Progress Bar */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#34d399"
                    strokeWidth="10"
                    strokeDasharray={`${donePercentage * 2.827} 282.7`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{donePercentage}%</span>
                  <span className="text-sm font-medium text-gray-500">Done</span>
                </div>
              </div>
              
              {/* Pie Chart Legend */}
              <ul className="flex-1 space-y-2">
                {chartData.map((item) => (
                  <li key={item.name} className="flex items-center space-x-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-sm text-gray-500 ml-auto">{item.value}</span>
                  </li>
                ))}
                <li className="flex justify-between items-center text-gray-800 font-semibold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>{totalTasks}</span>
                </li>
              </ul>
            </div>
            
            {/* Workload Card */}
            <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Team Workload</h3>
                <ul className="space-y-4">
                  {teamWorkload.map((member) => (
                    <li key={member.name} className="flex flex-col space-y-1">
                      <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-700">{member.name}</span>
                          </div>
                          <span className="text-sm text-gray-500 font-medium">{member.percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div
                              className="h-full rounded-full"
                              style={{
                                  width: `${member.percentage}%`,
                                  backgroundColor: member.color,
                              }}
                          ></div>
                      </div>
                    </li>
                  ))}
                </ul>
            </div>
            
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default Hero;