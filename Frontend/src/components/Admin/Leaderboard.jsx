// src/components/admin/Leaderboard.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Leaderboard = () => {
  // Dummy data (you can replace with real backend data later)
  const members = [
    { name: "Alice", email: "alice@team.com", completed: 12, delayed: 2, pending: 3 },
    { name: "Bob", email: "bob@team.com", completed: 8, delayed: 5, pending: 4 },
    { name: "Charlie", email: "charlie@team.com", completed: 15, delayed: 1, pending: 2 },
  ];

  // Pie chart data (progress summary)
  const chartData = [
    { name: "Completed", value: 35 },
    { name: "Delayed", value: 8 },
    { name: "Pending", value: 9 },
  ];

  const COLORS = ["#4ade80", "#f97316", "#60a5fa"]; // green, orange, blue

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6">
        Leaderboard & Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-indigo-600 text-white text-left">
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Completed</th>
                <th className="py-3 px-4">Delayed</th>
                <th className="py-3 px-4">Pending</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 transition text-gray-700"
                >
                  <td className="py-3 px-4 font-medium">{m.name}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">
                    {m.completed}
                  </td>
                  <td className="py-3 px-4 text-orange-600 font-semibold">
                    {m.delayed}
                  </td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">
                    {m.pending}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Analytics Pie Chart */}
        <div className="h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
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

export default Leaderboard;
