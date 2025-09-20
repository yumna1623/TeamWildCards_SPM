// src/components/user/UserProfile.jsx
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 1", tasks: 4 },
  { name: "Week 2", tasks: 7 },
  { name: "Week 3", tasks: 3 },
  { name: "Week 4", tasks: 8 },
];

const UserProfile = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-indigo-600" />
        My Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tasks" fill="#6366f1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserProfile;
