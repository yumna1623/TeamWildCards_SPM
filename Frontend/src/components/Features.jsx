// src/components/Features.jsx
import { Users, CheckSquare, BarChart3 } from "lucide-react";

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Main Heading and Lead Paragraph - Styled to match the image's prominence */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Why Choose <span className="text-indigo-700">TeamSync</span>?
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-20 leading-relaxed">
          Unlock seamless collaboration and boost productivity. TeamSync provides the tools your team needs to work efficiently, achieve goals, and stay connected from anywhere.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Feature 1: Create Teams */}
          <div className="p-8 bg-white rounded-3xl shadow-xl border-b-4 border-indigo-600 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
            <div className="flex items-center justify-center w-20 h-20 mb-6 bg-indigo-100 rounded-full text-indigo-600 shadow-md">
              <Users className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Create Teams
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Admins can easily set up new teams and invite members with secure, shareable passcodes.
            </p>
          </div>

          {/* Feature 2: Assign Tasks */}
          <div className="p-8 bg-white rounded-3xl shadow-xl border-b-4 border-indigo-600 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
            <div className="flex items-center justify-center w-20 h-20 mb-6 bg-indigo-100 rounded-full text-indigo-600 shadow-md">
              <CheckSquare className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Assign Tasks
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Delegating responsibilities is simple, allowing admins to assign tasks and set clear deadlines.
            </p>
          </div>

          {/* Feature 3: Track Progress */}
          <div className="p-8 bg-white rounded-3xl shadow-xl border-b-4 border-indigo-600 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
            <div className="flex items-center justify-center w-20 h-20 mb-6 bg-indigo-100 rounded-full text-indigo-600 shadow-md">
              <BarChart3 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Track Progress
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor team performance and project milestones in real-time with intuitive dashboards.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
