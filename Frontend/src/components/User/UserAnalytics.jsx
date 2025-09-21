import { Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Week 1", completed: 4, delayed: 1 },
  { name: "Week 2", completed: 7, delayed: 2 },
  { name: "Week 3", completed: 3, delayed: 3 },
  { name: "Week 4", completed: 8, delayed: 1 },
];

const UserAnalytics = () => {
  return (
    <div className="bg-[#C4D9FF] p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 transition-shadow hover:shadow-xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Activity className="w-7 h-7 text-indigo-600" />
            Performance Analytics
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Weekly task completion and delays overview.
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            className="text-sm"
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: "#E5E7EB" }}
            className="text-sm"
          />
          <Tooltip
            cursor={{ stroke: "#9CA3AF", strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#E5E7EB" }}
            itemStyle={{ color: "#E5E7EB" }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#14B8A6"
            strokeWidth={3}
            dot={{ fill: "#14B8A6", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="delayed"
            stroke="#EF4444"
            strokeWidth={3}
            dot={{ fill: "#EF4444", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserAnalytics;
