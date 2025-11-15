import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import OrgPage from './pages/OrgPage';
import QueueDetailPage from './pages/QueueDetailPage';
import Login from './pages/Login';
import Register from './pages/Register';
import OrgDashboard from './pages/OrgDashboard';
import StaffDashboard from './pages/StaffDashboard';
import UserDashboard from './pages/UserDashboard';

const ProtectedRoute = ({ roles = [], children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" replace />;
  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orgs/:orgId" element={<OrgPage />} />
          <Route path="/queues/:queueId" element={<QueueDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/org"
            element={
              <ProtectedRoute roles={['orgOwner']}>
                <OrgDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/staff"
            element={
              <ProtectedRoute roles={['staff', 'orgOwner']}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute roles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
