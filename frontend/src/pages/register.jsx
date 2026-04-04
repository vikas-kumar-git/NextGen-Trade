import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("register/", {
        username,
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.username?.[0] ||
          err?.response?.data?.email?.[0] ||
          err?.response?.data?.password?.[0] ||
          "Registration failed. Try a different username or check that the backend is running."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6">
            Create a local account to save predictions, view history, and test the stock forecasting workflow.
          </p>

          <form onSubmit={handleRegister}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Choose a username"
              className="w-full p-3 border rounded-lg mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-3 border rounded-lg mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="text-xs text-gray-500 mb-4">
              Avoid usernames starting with <span className="font-semibold">tg_</span>, because that prefix is reserved by the backend.
            </p>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button className="w-full bg-[#020C16] text-white py-2 rounded-lg hover:bg-[#071A2B] transition shadow-md hover:shadow-green-500/20">
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">project note</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
            Registration here creates a user inside the Django backend database used by this project.
          </div>

          <p className="text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-600 font-semibold">
              Login
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

export default Register;
