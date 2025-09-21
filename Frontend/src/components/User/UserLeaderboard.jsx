import { Trophy, Award, Check, Clock } from "lucide-react";

const leaderboardData = [
  { id: 1, name: "Alice", completed: 12, delayed: 2, avatarColor: "bg-purple-500" },
  { id: 2, name: "Bob", completed: 10, delayed: 3, avatarColor: "bg-blue-500" },
  { id: 3, name: "Charlie", completed: 8, delayed: 5, avatarColor: "bg-orange-500" },
  { id: 4, name: "David", completed: 7, delayed: 1, avatarColor: "bg-teal-500" },
  { id: 5, name: "Eva", completed: 6, delayed: 4, avatarColor: "bg-pink-500" },
];

const UserLeaderboard = () => {
  const sortedLeaderboardData = [...leaderboardData].sort((a, b) => b.completed - a.completed);

  const topPerformer = sortedLeaderboardData[0];

  const calculateProgress = (completed, total) => {
    return (completed / (completed + total)) * 100;
  };

  const getRankBadge = (index) => {
    if (index === 0) return <Award className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Award className="w-6 h-6 text-slate-400" />;
    if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
    return null;
  };

  return (
<div className="bg-[#C4D9FF] min-h-screen w-full p-4 md:p-6 relative overflow-hidden font-sans">
      <div className="z-10 relative">
        <div className="flex items-start justify-between mb-6">
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

        {/* Top Performer Card */}
        {topPerformer && (
          <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-6 mb-8 transform hover:scale-105 transition-transform duration-300">
            <Trophy className="w-16 h-16 text-yellow-400 stroke-[1.5]" />
            <div>
              <p className="text-lg font-bold text-[#E45A92] uppercase">Top Performer</p>
              <h3 className="text-3xl font-bold text-gray-800">{topPerformer.name}</h3>
              <p className="text-gray-500 text-sm">{topPerformer.completed} Tasks Completed</p>
            </div>
            <div className="ml-auto w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg" style={{ backgroundColor: topPerformer.avatarColor }}>
              {topPerformer.name.charAt(0)}
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-separate border-spacing-y-2">
            <tbody className="bg-white rounded-lg shadow-md">
              {sortedLeaderboardData.map((user, index) => (
                <tr
                  key={user.id}
                  className="bg-white hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="py-3 px-4 font-bold text-base text-[#E45A92] rounded-l-2xl flex items-center gap-2">
                    #{index + 1}
                    {getRankBadge(index)}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-base ${user.avatarColor}`}>
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-gray-800 text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-green-600 flex items-center gap-1">
                        {user.completed} <Check size={16} />
                      </span>
                      <span className="text-xs text-gray-500">Completed</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-red-500 flex items-center gap-1">
                        {user.delayed} <Clock size={16} />
                      </span>
                      <span className="text-xs text-gray-500">Delayed</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 rounded-r-2xl">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden group">
                      <div
                        className="h-1.5 rounded-full bg-indigo-600 transition-all duration-500 group-hover:scale-x-105"
                        style={{ width: `${calculateProgress(user.completed, user.delayed)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserLeaderboard;
