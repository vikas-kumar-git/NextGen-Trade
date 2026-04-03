import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  Star,
  LogOut,
  Menu,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: History, label: "History", path: "/history" },
];

const bottomItems = [
  { icon: Star, label: "Upgrade", path: "/upgrade" },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* TOP */}
      <div>
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img 
                src="/ngt-logo.jpeg"  
                alt="NGT Logo"
                className="w-8 h-8 object-contain"
            />

            {!collapsed && (
                <span className="font-bold text-lg">NextGen Trade</span>
            )}
            </div>

          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </button>
        </div>

        <hr className="border-gray-700" />

        {/* Menu */}
        <div className="mt-4 px-2 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition ${
                location.pathname === item.path ? "bg-gray-800" : ""
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
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800"
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
        >
          <LogOut size={16} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;