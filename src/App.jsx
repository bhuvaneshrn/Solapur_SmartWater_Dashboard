import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ZonesOverview from "./pages/ZonesOverview";
import DetailedAnalytics from "./pages/DetailedAnalytics";
import Reports from "./pages/Reports";
import SystemHealth from "./pages/SystemHealth";
import Alerts from "./pages/Alerts";
import Infrastructure from "./pages/Infrastructure";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/zones" element={<ZonesOverview />} />
          <Route path="/analytics" element={<DetailedAnalytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/health" element={<SystemHealth />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
