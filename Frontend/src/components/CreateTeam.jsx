// src/pages/CreateTeamPage.jsx
import { useState } from "react";
import { Users, Key, Mail, User } from "lucide-react";

const CreateTeamPage = () => {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Connect with backend API
    const newTeam = { teamName, leaderName, email, passcode };
    console.log("Team Created:", newTeam);
    alert("Team created successfully!");
  };

  const generatePasscode = () => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    setPasscode(code);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-200 via-white to-pink-200 px-6">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 mb-10 flex items-center gap-3 text-center">
        <Users className="w-12 h-12 text-indigo-700" />
        Create Your Team
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-6 bg-transparent"
      >
        {/* Team Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            placeholder="Enter your team name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
        </div>

        {/* Leader Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Leader Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              required
              placeholder="Your full name"
              className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Passcode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team Passcode
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                placeholder="Generate or enter a passcode"
                className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={generatePasscode}
              className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
        >
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeamPage;
