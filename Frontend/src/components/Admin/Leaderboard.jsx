import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const AdminLeaderboard = () => {
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

  // create aggregated pie data
  const totals = data.reduce((acc, cur) => {
    acc.completed += cur.completed;
    acc.delayed += cur.delayed;
    acc.pending += cur.pending;
    return acc;
  }, { completed: 0, delayed: 0, pending: 0 });

  const chartData = [
    { name: "Completed", value: totals.completed },
    { name: "Delayed", value: totals.delayed },
    { name: "Pending", value: totals.pending },
  ];

  const COLORS = ["#4ade80", "#f97316", "#60a5fa"];

  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Leaderboard & Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <table className="w-full bg-white rounded">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3">Member</th>
                <th className="p-3">Completed</th>
                <th className="p-3">Delayed</th>
                <th className="p-3">Pending</th>
              </tr>
            </thead>
            <tbody>
              {data.map((m, idx) => (
                <tr key={m.userId} className="border-b">
                  <td className="p-3">{m.name}</td>
                  <td className="p-3 text-green-600 font-semibold">{m.completed}</td>
                  <td className="p-3 text-orange-500 font-semibold">{m.delayed}</td>
                  <td className="p-3 text-blue-600 font-semibold">{m.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaderboard;
