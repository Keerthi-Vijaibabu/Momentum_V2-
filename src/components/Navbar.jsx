import { FaTasks, FaCalendarAlt, FaCog } from "react-icons/fa";
import { GiTomato } from "react-icons/gi";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-item">
        <Link to="/" className="nav-text">
          <FaTasks /> Dashboard
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/tasks" className="nav-text">
          <FaTasks /> Tasks
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/pomodoro" className="nav-text">
          <GiTomato /> Pomodoro
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/calendar" className="nav-text">
          <FaCalendarAlt /> Calendar
        </Link>
      </div>
      <div className="nav-item">
        <Link to="/settings" className="nav-text">
          <FaCog /> Settings
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
