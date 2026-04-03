import Sidebar from "./sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen p-6 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}

export default Layout;