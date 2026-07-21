import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MeterReadings from "./pages/MeterReadings";
import Connections from "./pages/Connections";
import Bills from "./pages/Bills";
import Consumers from "./pages/Consumers";
import Payments from "./pages/Payments";
import Login from "./pages/Login";

// Route protection component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("userRole");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Main Application Layout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Only Routes */}
        <Route
          path="/consumers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Consumers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/connections"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Connections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meter-readings"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <MeterReadings />
            </ProtectedRoute>
          }
        />

        {/* Shared (Admin & Consumer) Routes */}
        <Route path="/bills" element={<Bills />} />
        <Route path="/payments" element={<Payments />} />

        {/* Catch all unknown URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;