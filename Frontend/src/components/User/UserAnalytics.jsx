import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const UserAnalytics = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBoard = async () => {
      if (!token) return;
      const res = await fetch("http://localhost:5000/api/tasks/leaderboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const json = await res.json();
      setData(json);
    };
    fetchBoard();
  }, [token]);

  // Aggregate totals
  const totals = data.reduce(
    (acc, cur) => {
      acc.completed += cur.completed;
      acc.delayed += cur.delayed;
      acc.pending += cur.pending;
      acc.rejected += cur.rejected;
      return acc;
    },
    { completed: 0, delayed: 0, pending: 0, rejected: 0 }
  );

  const statusChartData = [
    { name: "Completed", value: totals.completed },
    { name: "Delayed", value: totals.delayed },
    { name: "Pending", value: totals.pending },
    { name: "Rejected", value: totals.rejected },
  ];

  const COLORS = ["#4ade80", "#f97316", "#60a5fa", "#ef4444"];

  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Team Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Pie Chart - Overall Status */}
        <div className="h-72 bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Task Status Distribution</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusChartData} dataKey="value" outerRadius={80} label>
                {statusChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Member Contribution */}
        <div className="h-72 bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Member Contributions</h3>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#4ade80" />
              <Bar dataKey="delayed" fill="#f97316" />
              <Bar dataKey="pending" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Trend (if you add per-week aggregation later) */}
        <div className="col-span-1 md:col-span-2 h-80 bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Completion Trend (coming soon)</h3>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#4ade80" />
              <Line type="monotone" dataKey="delayed" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default UserAnalytics;
