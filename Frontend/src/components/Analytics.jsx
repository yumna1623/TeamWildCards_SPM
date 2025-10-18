import { FaClock } from "react-icons/fa"; // Coming Soon icon
import { useState, useEffect } from "react";

const AnalyticsDashboard = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000); // Timer updates every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-2xl mx-auto">
        {/* Icon for Coming Soon */}
        <div className="mb-8">
          <FaClock className="text-7xl text-indigo-600 mx-auto mb-4" />
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">Analytics Dashboard</h2>
          <p className="text-lg text-gray-500 mb-6">
            We're working on something amazing! Our analytics feature will help you track team performance, visualize project progress, and make data-driven decisions.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-indigo-50 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-indigo-700">Real-time Insights</h3>
            <p className="text-gray-500">Get up-to-date insights on team performance and project progress.</p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-indigo-700">Visual Reports</h3>
            <p className="text-gray-500">Visualize your data with easy-to-understand charts and graphs.</p>
          </div>

         
        </div>

       

        {/* Bottom Message */}
        <p className="text-sm text-gray-400">
          Stay tuned! We'll notify you when Analytics goes live.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
