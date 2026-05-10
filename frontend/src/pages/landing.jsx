import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../theme";

function Landing() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen overflow-hidden ${
        isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.18),_transparent_25%),linear-gradient(135deg,_#020617_0%,_#0f172a_48%,_#111827_100%)]"
            : "bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.14),_transparent_25%),linear-gradient(135deg,_#f8fafc_0%,_#ecfeff_45%,_#f0fdf4_100%)]"
        }`}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.35em] ${
                isDark ? "text-cyan-300" : "text-cyan-700"
              }`}
            >
              NextGen Trade
            </p>
            <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              AI-assisted market insights and prediction workflows
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                isDark
                  ? "border-white/20 text-slate-100 hover:border-cyan-300 hover:text-cyan-200"
                  : "border-slate-200 bg-white/80 text-slate-700 hover:border-cyan-500 hover:text-cyan-700"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                isDark
                  ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                  : "bg-cyan-600 text-white hover:bg-cyan-700"
              }`}
            >
              Sign Up
            </Link>
          </div>
        </header>

        <main className="grid flex-1 items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr]">
          <section className="max-w-2xl">
            <div
              className={`mb-6 inline-flex rounded-full border px-4 py-2 text-sm ${
                isDark
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
                  : "border-cyan-300 bg-cyan-50 text-cyan-700"
              }`}
            >
              Smarter stock exploration for your next move
            </div>

            <h1
              className={`text-5xl font-black leading-tight md:text-7xl ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Predict trends, track signals, and act with confidence.
            </h1>

            <p
              className={`mt-6 max-w-xl text-lg leading-8 ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Explore company data, generate next-day stock predictions, and
              keep your research history in one focused workspace built for
              fast decision-making.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className={`rounded-full px-7 py-3 text-base font-semibold transition ${
                  isDark
                    ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                }`}
              >
                Get Started
              </Link>
              <Link
                to="/register"
                className={`rounded-full border px-7 py-3 text-base font-semibold transition ${
                  isDark
                    ? "border-white/20 text-white hover:border-emerald-300 hover:text-emerald-200"
                    : "border-slate-200 bg-white/80 text-slate-700 hover:border-emerald-500 hover:text-emerald-700"
                }`}
              >
                Create Account
              </Link>
            </div>

            {/* <div
              className={`mt-12 grid gap-4 text-sm sm:grid-cols-3 ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <div
                className={`rounded-2xl border p-4 backdrop-blur ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/75 shadow-lg shadow-cyan-100/40"
                }`}
              >
                <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Live Flow
                </p>
                <p className="mt-2">Search, predict, and review saved history.</p>
              </div>
              <div
                className={`rounded-2xl border p-4 backdrop-blur ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/75 shadow-lg shadow-cyan-100/40"
                }`}
              >
                <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Local Auth
                </p>
                <p className="mt-2">Quick login and signup backed by Django.</p>
              </div>
              <div
                className={`rounded-2xl border p-4 backdrop-blur ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-slate-200 bg-white/75 shadow-lg shadow-cyan-100/40"
                }`}
              >
                <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Focused UI
                </p>
                <p className="mt-2">A cleaner entry point before the dashboard.</p>
              </div>
            </div> */}
          </section>

          <section className="relative">
            <div
              className={`absolute -left-6 top-8 h-24 w-24 rounded-full blur-3xl ${
                isDark ? "bg-cyan-400/20" : "bg-cyan-300/40"
              }`}
            />
            <div
              className={`absolute right-0 top-0 h-28 w-28 rounded-full blur-3xl ${
                isDark ? "bg-emerald-400/20" : "bg-emerald-300/40"
              }`}
            />

            <div
              className={`relative rounded-[2rem] border p-5 backdrop-blur ${
                isDark
                  ? "border-white/10 bg-white/8 shadow-2xl shadow-cyan-950/30"
                  : "border-white/70 bg-white/80 shadow-2xl shadow-cyan-200/60"
              }`}
            >
              <div
                className="h-[500px] rounded-[1.5rem] bg-cover bg-center"
                style={{ backgroundImage: "url('/ngt-main.jpeg')" }}
              />

              <div
                className={`absolute bottom-10 left-10 right-10 rounded-3xl border p-6 backdrop-blur ${
                  isDark
                    ? "border-white/10 bg-slate-950/70"
                    : "border-white/80 bg-white/88 shadow-lg shadow-cyan-100/70"
                }`}
              >
                <p
                  className={`text-xs uppercase tracking-[0.3em] ${
                    isDark ? "text-cyan-300" : "text-cyan-700"
                  }`}
                >
                  Market workflow
                </p>
                <p className={`mt-3 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Start with the overview, then jump into your account.
                </p>
                {/* <p
                  className={`mt-2 text-sm leading-6 ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  This landing page now becomes the first experience, with auth
                  one click away.
                </p> */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Landing;
