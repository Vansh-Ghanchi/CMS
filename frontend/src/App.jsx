import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import AdminRoutes from "./routes/AdminRoutes";
import FacultyRoutes from "./routes/FacultyRoutes";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Specific Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminRoutes />
          </ProtectedRoute>
        } />

        {/* Faculty Specific Routes */}
        <Route path="/faculty/*" element={
          <ProtectedRoute allowedRoles={['faculty-1', 'faculty-2', 'faculty-3', 'faculty-4']}>
             <FacultyRoutes />
          </ProtectedRoute>
        } />

        {/* Global Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
