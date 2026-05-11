import { useTheme } from "../theme";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
        isDark
          ? "border-white/15 bg-white/100 text-slate-100 hover:border-cyan-300 hover:text-cyan-200"
          : "border-slate-200 bg-black/80 text-slate-700 hover:border-cyan-500 hover:text-cyan-700"
      }`}
    >
      {isDark ? <i className="fas fa-sun bg-white/50 text-yellow-300 "></i> : <i className="fas fa-moon text-white size-5"></i>}
    </button>
  );
}

export default ThemeToggle;
