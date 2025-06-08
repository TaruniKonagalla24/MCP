import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UserDashboard from './components/UserDashboard';
import Hackathon from './components/Hackathon';
import Progress from './components/Progress';
import AdminDashboard from './components/AdminDashboard';
import AdminUsers from './components/AdminUsers';
import AdminHackathons from './components/AdminHackathons';
import AdminReports from './components/AdminReports';
import AdminReview from './components/AdminReview'; 

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const PrivateRoute = ({ children }) => {
    return loggedInUser ? children : <Navigate to="/" replace />;
  };

  // Add this inside your App component, before return:
  const AdminRoute = ({ children }) => {
    return loggedInUser?.role === 'admin' ? children : <Navigate to="/" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<LoginForm setLoggedInUser={setLoggedInUser} />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <UserDashboard setLoggedInUser={setLoggedInUser}/>
          </PrivateRoute>
        }
      />
      <Route
        path="/hackathons"
        element={
          <PrivateRoute>
            <Hackathon />
          </PrivateRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <PrivateRoute>
            <Progress />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
  path="/admin/review"
  element={
    <AdminRoute>
      <AdminReview />
    </AdminRoute>
  }
/>
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/hackathons"
        element={
          <AdminRoute>
            <AdminHackathons />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <AdminRoute>
            <AdminReports />
          </AdminRoute>
        }
      />
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard setLoggedInUser={setLoggedInUser}/>
    </AdminRoute>
  }
/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
