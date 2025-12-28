import { Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ChatbotPage from './pages/Chatbot';
import NotfoundPage from './pages/404';
// import { useState } from 'react';

export default function App() {
  return (
    <Routes>
      <Route path="/app" element={<DashboardPage />} />
      <Route path="/app/login" element={<LoginPage />} />

      <Route path="/app/dashboard" element={<DashboardPage />} />
      <Route path="/app/chatbot" element={<ChatbotPage />} />
      <Route path="/app/chatbot/:chatId" element={<ChatbotPage />} />

      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  )
}
  


