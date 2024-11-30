import React,{ useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
// import useAuth from './hooks/useAuth';
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  // const { isAuthenticated } = useAuth();
  const { user } = useAuth();  
  
  // return user ? children : <Navigate to="/login" />;
  return user ? children : <Navigate to="/login" />;
}

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />

    {/* Protected Dashboard Route */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />

    {/* Redirect root route to dashboard */}
    <Route path="/" element={<Navigate to="/dashboard" />} />

    {/* Redirect invalid routes to dashboard */}
    <Route path="*" element={<Navigate to="/dashboard" />} />
  </Routes>
);

export default AppRoutes;






// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import DashboardPage from './pages/DashboardPage';
// import useAuth from './hooks/useAuth';

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <LoginPage />;
// }

// const AppRoutes = () => (
//   <Routes>
//     <Route path="/login" element={<LoginPage />} />
//     <Route path="/signup" element={<SignupPage />} />
//     <Route
//       path="/dashboard"
//       element={
//         <ProtectedRoute>
//           <DashboardPage />
//         </ProtectedRoute>
//       }
//     />
//   </Routes>
// );

// export default AppRoutes;

// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from '../pages/LoginPage';
// import SignupPage from '../pages/SignupPage';
// import Dashboard from '../pages/Dashboard';
// import useAuth from '../hooks/useAuth';

// const AppRoutes = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
//       <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />} />
      
//       {/* Protected Routes */}
//       <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

//       {/* Redirect Root or Invalid Routes */}
//       <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
