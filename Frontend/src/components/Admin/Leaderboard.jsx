// src/components/Admin/Leaderboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Trophy, Check, Clock } from "lucide-react";

const AdminLeaderboard = () => {
  const { token, user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      if (!token) return;
      setLoading(true);

      try {
        const res = await fetch(
          `http://localhost:5000/api/tasks/leaderboard?teamId=${user.team}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [token, user]);

  if (loading) return <p className="p-6 text-gray-500">Loading leaderboard...</p>;
  if (!data.length) return <p className="p-6 text-gray-500">No leaderboard data available.</p>;

  const top = data[0];

  return (
    <div className="p-6 bg-[#F3F4F6] min-h-screen rounded-xl">
      <div className="mb-6 flex items-center gap-3">
        <Trophy className="w-7 h-7 text-indigo-700" />
        <h2 className="text-2xl font-bold text-gray-800">Team Leaderboard</h2>
      </div>

      {/* Top performer */}
      {top && (
        <div className="bg-white p-5 rounded-xl shadow mb-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
            {top.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-sm text-gray-500">Top Performer</p>
            <h3 className="text-2xl font-bold">{top.name}</h3>
            <p className="text-sm text-gray-500">
              {top.completed} completed • {top.delayed} delayed • {top.pending} pending
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white p-4 rounded-xl shadow">
        <table className="w-full text-left">
          <thead className="text-sm text-gray-600 border-b">
            <tr>
              <th className="py-2">#</th>
              <th>Name</th>
              <th className="text-center">Completed</th>
              <th className="text-center">Delayed</th>
              <th className="text-center">Pending</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.user} className="border-t hover:bg-gray-50 transition">
                <td className="py-3">{i + 1}</td>
                <td className="py-3 font-medium">{row.name}</td>
                <td className="py-3 text-center text-green-600 font-semibold">
                  {row.completed} <Check className="inline-block w-4 h-4 ml-1" />
                </td>
                <td className="py-3 text-center text-red-500 font-semibold">
                  {row.delayed} <Clock className="inline-block w-4 h-4 ml-1" />
                </td>
                <td className="py-3 text-center text-gray-700 font-medium">{row.pending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaderboard;
