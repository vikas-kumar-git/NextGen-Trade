import { useTheme } from "../theme";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
        isDark
          ? "border-white/15 bg-white/5 text-slate-100 hover:border-cyan-300 hover:text-cyan-200"
          : "border-slate-200 bg-white/80 text-slate-700 hover:border-cyan-500 hover:text-cyan-700"
      }`}
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
