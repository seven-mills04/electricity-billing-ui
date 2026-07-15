import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Consumers from "../pages/Consumers";
import Connections from "../pages/Connections";
import MeterReadings from "../pages/MeterReadings";
import Bills from "../pages/Bills";
import Payments from "../pages/Payments";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="payments" element={<Payments />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="consumers" element={<Consumers />} />
        <Route path="connections" element={<Connections />} />
        <Route path="meter-readings" element={<MeterReadings />} />
        <Route path="bills" element={<Bills />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;