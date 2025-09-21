import { useState } from "react";
import { Users, Key, Mail, User, Network, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ import this

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/create-team",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teamName, leaderName, email, passcode }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("✅ Team created successfully!");
        console.log("Saved in DB:", data.team);

        // clear form
        setTeamName("");
        setLeaderName("");
        setEmail("");
        setPasscode("");

        // navigate to dashboard after delay
        setTimeout(() => navigate("/AdminDashboard"), 1000);
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Something went wrong!");
    }
  };

  const generatePasscode = () => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    setPasscode(code);
  };

  const handleCancel = () => {
    setTeamName("");
    setLeaderName("");
    setEmail("");
    setPasscode("");
    setSuccessMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-sans relative overflow-hidden">
      {/* background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.15),transparent_70%)]"></div>

      <div className="relative flex flex-col lg:flex-row w-full min-h-screen bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden animate-fade-in border border-white/20">
        {/* Left: Form */}
        <div className="flex-1 p-6 sm:p-14 bg-white/90 backdrop-blur-md flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-8">
            <Users className="w-7 h-7 text-indigo-700" />
            <span className="text-lg font-semibold text-gray-800">
              TeamSync
            </span>
          </div>

          <h1 className="text-2xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Create Your <span className="text-indigo-600">Dream Team</span>
          </h1>
          <p className="text-gray-500 mb-10 text-lg">
            Start a new team and manage tasks, projects, and growth together.
          </p>

          {successMessage && (
            <div className="mb-6 text-center text-green-700 font-medium p-3 bg-green-100 rounded-lg border border-green-300 text-sm md:text-base">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-5">
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
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm text-sm"
              />
            </div>

            {/* Leader Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Leader Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
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
                  <Key className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                    placeholder="Generate or enter a passcode"
                    className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={generatePasscode}
                  className="px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md transition transform hover:scale-105"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
              >
                Create Team
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 bg-gray-200 text-gray-700 text-lg font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-gray-300 transition transform hover:scale-105"
              >
                <XCircle className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Right: Visuals */}
        <div className="flex flex-1 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,#312e81_1px)] [background-size:16px_16px] pointer-events-none"></div>

          <div className="relative z-10 p-6 rounded-full bg-white/20 animate-bounce">
            <div className="relative p-6 rounded-full bg-white/30">
              <Network className="w-20 h-20 text-white" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white z-10 mt-8 mb-4 text-center drop-shadow-lg">
            Connect & Grow
          </h2>
          <p className="text-indigo-100 max-w-sm mx-auto text-center z-10 text-lg leading-relaxed">
            Build a cohesive team and collaborate on your projects with a shared
            vision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
