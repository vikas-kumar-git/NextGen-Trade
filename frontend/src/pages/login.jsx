import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../theme";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isDark } = useTheme();

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
            Welcome Back
          </h2>
          <p className={`mb-3 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Sign in to search stocks, generate next-day predictions, and review your saved history.
          </p>
          <p className={`mb-6 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            If this is your first time opening the project, use the Register page to create a local account.
          </p>

          <form onSubmit={handleLogin}>
            <label className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className={`mb-4 w-full rounded-2xl border p-3 focus:border-cyan-400 focus:outline-none ${
                isDark
                  ? "border-white/10 bg-slate-900/80 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className={`mb-2 block text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`mb-4 w-full rounded-2xl border p-3 focus:border-cyan-400 focus:outline-none ${
                isDark
                  ? "border-white/10 bg-slate-900/80 text-white placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

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
                  ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                  : "bg-emerald-500 text-white hover:bg-emerald-600"
              }`}
            >
              Log In to Dashboard
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
            <span className={`px-3 text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>or login with</span>
            <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
          </div>

         <div className="container mx-auto grid w-full max-w-sm grid-cols-1 gap-4 sm:grid-cols-2">
           <div
            className={`text-center rounded-2xl border p-4 text-sm ${
              isDark
                ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-50"
                : "border-cyan-200 bg-cyan-50 text-cyan-800"
            }`}
          >
            Google
          </div>
          <div
            className={`text-center rounded-2xl border p-4 text-sm ${
              isDark
                ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-50"
                : "border-cyan-200 bg-cyan-50 text-cyan-800"
            }`}
          >
            Apple
          </div>
         </div>

          <p className={`mt-6 text-center text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className={`font-semibold ${
                isDark ? "text-cyan-300 hover:text-cyan-200" : "text-cyan-700 hover:text-cyan-800"
              }`}
            >
              Register Now
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
                    ? "bg-gradient-to-br from-slate-950/40 via-cyan-950/20 to-slate-950/70"
                    : "bg-gradient-to-br from-white/20 via-cyan-100/35 to-slate-100/70"
                }`}
              />
              <div className="relative mt-auto p-10">
                <div
                  className={`rounded-[1.75rem] border p-6 backdrop-blur ${
                    isDark
                      ? "border-white/10 bg-slate-950/65"
                      : "border-white/80 bg-white/88 shadow-lg shadow-cyan-100/70"
                  }`}
                >
                  <p className={`text-xs uppercase tracking-[0.3em] ${isDark ? "text-cyan-300" : "text-cyan-700"}`}>
                    Sign In
                  </p>
                  <p className={`mt-3 text-3xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                    Re-enter the trading workspace with the same energy as the landing page.
                  </p>
                </div>
              </div>
            </div>
                </div>

      </div>
  );
}

export default Login;
