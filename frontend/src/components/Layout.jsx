import Sidebar from "./sidebar";
import { useTheme } from "../theme";

function Layout({ children }) {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"
      }`}
    >
      <Sidebar />
      <div
        className={`h-screen flex-1 overflow-y-auto p-6 transition-all duration-300 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_24%),radial-gradient(circle_at_85%_10%,_rgba(16,185,129,0.1),_transparent_22%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]"
            : "bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.1),_transparent_24%),radial-gradient(circle_at_85%_10%,_rgba(16,185,129,0.08),_transparent_22%),linear-gradient(180deg,_#f8fafc_0%,_#ecfeff_55%,_#f0fdf4_100%)]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
