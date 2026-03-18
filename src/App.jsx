import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";

//ROutes
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Pomodoro from "./pages/PomodoroPage";
import CalendarPage from "./pages/CalendarPage";
import PomodoroPage from "./pages/PomodoroPage";
// import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          {/* 
          <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
