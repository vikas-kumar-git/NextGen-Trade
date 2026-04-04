import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("token/", { username, password });
      localStorage.setItem("accessToken", res.data.access);
      navigate("/dashboard");
    } catch {
      setError(
        "Login failed. Check your username and password, or create a new account from the Register page."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-3">
            Sign in to search stocks, generate next-day predictions, and review your saved history.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            If this is your first time opening the project, use the Register page to create a local account.
          </p>

          <form onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 border rounded-lg mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button className="w-full bg-[#020C16] text-white py-2 rounded-lg hover:bg-[#071A2B] transition shadow-md hover:shadow-green-500/20">
              Log In to Dashboard
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">demo note</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            This project uses local username/password authentication. Social login buttons are not connected in this version.
          </div>

          <p className="text-sm text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold">
              Register Now
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
            <div
            className="hidden md:flex w-1/2 bg-cover bg-center"
            style={{
                backgroundImage: "url('/ngt-main.jpeg')",
            }}
            ></div>
                </div>

      </div>
  );
}

export default Login;
