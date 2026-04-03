import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import PrivateRoute from "./components/PrivateRoute";
import History from "./pages/history";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

        <Route path="/history" element={
      <PrivateRoute>
        <History />
      </PrivateRoute>
    } />
        </Routes>
  );
}

export default App;