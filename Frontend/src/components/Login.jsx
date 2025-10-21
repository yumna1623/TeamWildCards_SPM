import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [password, setPassword] = useState("");  // For personal password
  const [message, setMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);  // To control login success message
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passcode, password }),  // Include both passcode and password
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save token and user to context + localStorage
      login(data.user, data.token);

      // Show success message and hide login form
      setLoginSuccess(true);

      // Redirect based on role
      if (data.user.role === "admin") navigate("/AdminDashboard");
      else navigate("/UserDashBoardPage");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!loginSuccess ? (
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-md w-96 space-y-5"
        >
          <h2 className="text-2xl font-bold text-indigo-700 text-center">Login</h2>
          {message && <p className="text-red-500 text-center">{message}</p>}
          
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>

          {/* Team Passcode Input */}
          <div>
            <label className="block text-gray-700 mb-1">Team Passcode</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>

          {/* Personal Password Input */}
          <div>
            <label className="block text-gray-700 mb-1">Personal Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-md w-96 space-y-5">
          <h2 className="text-2xl font-bold text-green-700 text-center">Successful Login!</h2>
          <p className="text-center text-lg text-gray-700">Welcome back! You have successfully logged in.</p>
        </div>
      )}
    </div>
  );
};

export default Login;
