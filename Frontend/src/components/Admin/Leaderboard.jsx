import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Trophy, Check, Clock, Medal, Star } from "lucide-react"; // Medal for 2nd, Star for 3rd

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

  const getRankIcon = (rank) => {
    switch (rank) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Star className="w-6 h-6 text-bronze-400" />;
      default:
        return null;
    }
  };

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
            {/* Completion rate progress bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(top.completed / (top.completed + top.pending)) * 100}%` }}
              ></div>
            </div>
            <p className="mt-1 text-sm text-gray-600">{Math.round((top.completed / (top.completed + top.pending)) * 100)}%</p>
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
              <th className="text-center">Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.user} className="border-t hover:bg-gray-50 transition">
                <td className="py-3">{getRankIcon(i)}</td> {/* Show appropriate icon based on rank */}
                <td className="py-3 font-medium">{row.name}</td>
                <td className="py-3 text-center text-green-600 font-semibold">
                  {row.completed} <Check className="inline-block w-4 h-4 ml-1" />
                </td>
                <td className="py-3 text-center text-red-500 font-semibold">
                  {row.delayed} <Clock className="inline-block w-4 h-4 ml-1" />
                </td>
                <td className="py-3 text-center text-gray-700 font-medium">{row.pending}</td>
                <td className="py-3 text-center">
                  {/* Completion Rate Progress Bar */}
                  <div className="w-full bg-gray-200 h-4 rounded-full mt-2">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{
                        width: `${(row.completed / (row.completed + row.pending)) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{Math.round((row.completed / (row.completed + row.pending)) * 100)}%</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaderboard;
