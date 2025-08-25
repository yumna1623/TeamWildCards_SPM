// src/components/HowItWorks.jsx
import { UserPlus, LogIn, ClipboardCheck } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Main Heading and Lead Paragraph */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Simple Steps to <span className="text-indigo-700">TeamSync</span> Success
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-20 leading-relaxed">
          Getting started with TeamSync is easy. Follow these three straightforward steps to streamline your team's collaboration and productivity.
        </p>

        {/* How It Works Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Step 1: Create a Team */}
          <div className="p-8 bg-gray-50 rounded-3xl shadow-lg border-t-4 border-indigo-500 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center w-20 h-20 mb-6 bg-indigo-100 rounded-full text-indigo-600 shadow-md">
              <UserPlus className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              1. Create a Team
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Admins register, set up their team, and generate a secure passcode to invite members.
            </p>
          </div>

          {/* Step 2: Join the Team */}
          <div className="p-8 bg-gray-50 rounded-3xl shadow-lg border-t-4 border-indigo-500 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center w-20 h-20 mb-6 bg-indigo-100 rounded-full text-indigo-600 shadow-md">
              <LogIn className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              2. Join the Team
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Members simply use the provided passcode to join their respective teams and get started.
            </p>
          </div>

          {/* Step 3: Manage Tasks */}
          <div className="p-8 bg-gray-50 rounded-3xl shadow-lg border-t-4 border-indigo-500 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-center w-20 h-20 mb-6 bg-indigo-100 rounded-full text-indigo-600 shadow-md">
              <ClipboardCheck className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              3. Manage Tasks
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Admins assign tasks, members track and complete them, and everyone monitors progress in one place.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
