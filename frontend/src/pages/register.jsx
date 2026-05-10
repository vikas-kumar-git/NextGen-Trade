import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../theme";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("register/", {
        username,
        email,
        password,
      });

      navigate("/login");
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
    <div
      className={`min-h-screen px-4 py-8 ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div
        className={`mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-7xl overflow-hidden rounded-[2rem] border backdrop-blur ${
          isDark
            ? "border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/25"
            : "border-slate-200 bg-white/85 shadow-2xl shadow-cyan-100/60"
        }`}
      >

        {/* LEFT SIDE */}
        <div className="w-full p-8 md:w-1/2 md:p-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p
              className={`text-xs font-semibold uppercase tracking-[0.35em] ${
                isDark ? "text-cyan-300" : "text-cyan-700"
              }`}
            >
              NextGen Trade
            </p>
            <ThemeToggle />
          </div>
          <h2 className={`mb-2 text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
            Create Account
          </h2>
          <p className={`mb-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Create a local account to save predictions, view history, and test the stock forecasting workflow.
          </p>

          <form onSubmit={handleRegister}>
            <label className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              Username
            </label>

            <input
              type="text"
              placeholder="Choose a username"
              className={`mb-4 w-full rounded-2xl border p-3 focus:border-cyan-400 focus:outline-none ${
                isDark
                  ? "border-white/10 bg-slate-900/80 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`mb-4 w-full rounded-2xl border p-3 focus:border-cyan-400 focus:outline-none ${
                isDark
                  ? "border-white/10 bg-slate-900/80 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className={`mb-4 w-full rounded-2xl border p-3 focus:border-cyan-400 focus:outline-none ${
                isDark
                  ? "border-white/10 bg-slate-900/80 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* <p className={`mb-4 text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Avoid usernames starting with <span className="font-semibold">tg_</span>, because that prefix is reserved by the backend.
            </p> */}

            {error && (
              <div
                className={`mb-4 rounded-2xl border p-3 text-sm ${
                  isDark
                    ? "border-red-400/30 bg-red-500/10 text-red-100"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {error}
              </div>
            )}

            <button
              className={`w-full rounded-2xl py-3 font-semibold transition ${
                isDark
                  ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                  : "bg-cyan-600 text-white hover:bg-cyan-700"
              }`}
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
            <span className={`px-3 text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>project note</span>
            <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
          </div>

          {/* <div
            className={`rounded-2xl border p-4 text-sm ${
              isDark
                ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-50"
                : "border-cyan-200 bg-cyan-50 text-cyan-800"
            }`}
          >
            Registration here creates a user inside the Django backend database used by this project.
          </div> */}

          <p className={`mt-6 text-center text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Already have an account?{" "}
            <Link
              to="/login"
              className={`font-semibold ${
                isDark ? "text-cyan-300 hover:text-cyan-200" : "text-cyan-700 hover:text-cyan-800"
              }`}
            >
              Login
            </Link>
          </p>

          <p className="mt-3 text-center text-sm">
            <Link
              to="/"
              className={isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-500 hover:text-slate-700"}
            >
              Back to landing page
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE */}
            <div
            className="relative hidden w-1/2 bg-cover bg-center md:flex"
            style={{
                backgroundImage: "url('/ngt-main.jpeg')",
            }}
            >
              <div
                className={`absolute inset-0 ${
                  isDark
                    ? "bg-gradient-to-br from-slate-950/45 via-emerald-950/20 to-slate-950/75"
                    : "bg-gradient-to-br from-white/20 via-emerald-100/35 to-slate-100/70"
                }`}
              />
              <div className="relative mt-auto p-10">
                <div
                  className={`rounded-[1.75rem] border p-6 backdrop-blur ${
                    isDark
                      ? "border-white/10 bg-slate-950/65"
                      : "border-white/80 bg-white/88 shadow-lg shadow-emerald-100/70"
                  }`}
                >
                  <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>
                    Get Started
                  </p>
                  <p className={`mt-3 text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                    Create your account inside the same visual world as the new landing page.
                  </p>
                </div>
              </div>
            </div>
                </div>

      </div>
  );
}

export default Register;
