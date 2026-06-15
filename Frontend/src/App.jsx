import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import GridBackground from './components/UI/GridBackground';
import HomePage from './pages/Home/HomePage';
import EmergencyPage from './pages/Emergency/EmergencyPage';
import HospitalsPage from './pages/Hospitals/HospitalsPage';
import MLPage from './pages/MLPredict/MLPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Login/LoginPage';
import ProtectedRoute from "./components/ProtectedRoute";

function Layout({ children }) {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login has its own full-page layout */}
          <Route path="/login" element={<><GridBackground /><LoginPage /></>} />

          {/* All other pages share the Navbar layout */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/emergency" element={<Layout><EmergencyPage /></Layout>} />
          <Route path="/hospitals" element={<Layout><HospitalsPage /></Layout>} />

          <Route path="/predict" element={ <ProtectedRoute> <MLPage /> </ProtectedRoute>
                  
         }
/>

          <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
