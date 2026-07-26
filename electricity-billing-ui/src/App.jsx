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
      
      <Route path="/" element={<LandingPage />} />

      
      <Route path="/login" element={<Login />} />

      
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        
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

        
        <Route path="/bills" element={<Bills />} />
        <Route path="/payments" element={<Payments />} />

        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;