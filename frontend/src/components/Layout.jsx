import Sidebar from "./sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 h-screen p-6 transition-all duration-300 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;