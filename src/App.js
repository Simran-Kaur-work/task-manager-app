import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Task from "./Screen/HomePage/Main/Task/Task";
import Login from "./Screen/Components/Login";
import Signup from "./Screen/Components/Signup";
import ProtectedRoute from "./Screen/Routes/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* NEW */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Task />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
