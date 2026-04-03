import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("token/", { username, password });
      localStorage.setItem("accessToken", res.data.access);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-lg mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-[#020C16] text-white py-2 rounded-lg hover:bg-[#071A2B] transition shadow-md hover:shadow-green-500/20">
              Log In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">or login with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button className="w-1/2 border p-2 rounded-lg hover:bg-gray-100">
              Google
            </button>
            <button className="w-1/2 border p-2 rounded-lg hover:bg-gray-100">
              Apple
            </button>
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