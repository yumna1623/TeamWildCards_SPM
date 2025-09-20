import { Trophy } from "lucide-react";

const leaderboardData = [
  { id: 1, name: "Alice", completed: 12, delayed: 2 },
  { id: 2, name: "Bob", completed: 10, delayed: 3 },
  { id: 3, name: "Charlie", completed: 8, delayed: 5 },
];

const UserLeaderboard = () => {
  return (
    <div className="bg-[#F6C6EA] min-h-screen  md:p-8 rounded-xl shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(#D77FA1_1px,transparent_1px)] before:bg-[size:20px_20px]">
      <div className="flex items-start justify-between mb-6 z-10 relative">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Trophy className="w-7 h-7 text-[#E45A92]" />
            Team Leaderboard
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            Top performers based on completed tasks.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto z-10 relative">
        <table className="w-full text-left table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="text-sm font-semibold text-gray-500 uppercase">
              <th className="py-3 px-4 rounded-l-lg">Rank</th>
              <th className="py-3 px-4">Member</th>
              <th className="py-3 px-4 text-center">Completed</th>
              <th className="py-3 px-4 text-center rounded-r-lg">Delayed</th>
            </tr>
          </thead>
          <tbody className="bg-white rounded-lg">
            {leaderboardData.map((user, index) => (
              <tr
                key={user.id}
                className="bg-white hover:bg-gray-100 transition-all duration-200 shadow-sm"
              >
                <td className="py-3 px-4 font-bold text-lg text-[#E45A92] rounded-l-lg">
                  #{index + 1}
                </td>
                <td className="py-3 px-4 font-medium text-gray-700">{user.name}</td>
                <td className="py-3 px-4 text-center text-green-600 font-semibold">
                  {user.completed}
                </td>
                <td className="py-3 px-4 text-center text-red-500 font-semibold rounded-r-lg">
                  {user.delayed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLeaderboard;
