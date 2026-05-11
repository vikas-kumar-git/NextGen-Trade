import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, History, Star, LogOut, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../theme";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: History, label: "History", path: "/history" },
];

const bottomItems = [{ icon: Star, label: "Upgrade", path: "/upgrade" }];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`h-screen shrink-0 flex flex-col justify-between overflow-hidden backdrop-blur transition-all duration-300 ${
        isDark
          ? "border-r border-white/10 bg-slate-950/95 text-white"
          : "border-r border-slate-200 bg-white/80 text-slate-800 shadow-xl shadow-cyan-100/40"
      } ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* TOP */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* Toggle Button */}
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`rounded-full border p-2 transition ${
              isDark
                ? "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-200"
                : "border-slate-200 bg-white text-slate-600 hover:border-cyan-500 hover:text-cyan-700"
            }`}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-0.5">
           

            {!collapsed && (
              <div>
                 <img
              src="/NGT.png"
              alt="NGT Logo"
              className="w-15 h-10 object-contain"
            />
                <span
                  className={`block text-lg font-bold ${
                    isDark ? "text-cyan-200" : "text-cyan-700"
                  }`}
                >
                  NextGen Trade
                </span>
                {/* <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Market AI
                </span> */}
              </div>
            )}
          </div>

        </div>

        <hr className={isDark ? "border-white/10" : "border-slate-200"} />

        {/* Menu */}
        <div className="mt-4 px-2 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-2xl p-3 transition ${
                location.pathname === item.path
                  ? isDark
                    ? "bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/30"
                    : "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200"
                  : isDark
                    ? "text-slate-300 hover:bg-white/5 hover:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-6 px-2 space-y-2">
          {bottomItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-2xl p-3 transition ${
                isDark
                  ? "text-slate-400 hover:bg-white/5 hover:text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div
        className={`shrink-0 p-4 ${
          isDark ? "border-t border-white/10" : "border-t border-slate-200"
        }`}
      >
        {!collapsed && (
          <div className="mb-3">
            <ThemeToggle />
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex w-full items-center gap-2 rounded-2xl border px-3 py-2 transition ${
            isDark
              ? "border-red-400/20 bg-red-500/15 text-red-100 hover:bg-red-500/25"
              : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          }`}
        >
          <LogOut size={16} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
